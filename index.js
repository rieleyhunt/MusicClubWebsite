const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const r2Uploader = require('./r2Uploader');
require('dotenv').config();


console.log('R2 Key loaded?', !!process.env.R2_ACCESS_KEY_ID);

const app = express();

// ----- CORS (one time) -----
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,     // e.g. https://<amplify>.amplifyapp.com
  process.env.FRONTEND_URL_ALT, // e.g. https://your-frontend-domain.com
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    // allow REST tools / SSR / health checks with no origin
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
}));

// ----- Body parser (one time) -----
app.use(express.json());

// ----- R2 uploader routes -----
app.use('/r2', r2Uploader);

// ----- Email routes -----
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const bookingLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 5,                // max 5 requests/min
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // smtp.gmail.com
  port: Number(process.env.SMTP_PORT),// 587
  secure: false,                      // false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,      // your Gmail address
    pass: process.env.SMTP_PASS,      // the 16-char app password
  },
});

// quick fields validator
function isEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

app.post('/booking', bookingLimiter, async (req, res) => {
  try {
    const { name, email, message, date, venue, phone, hp } = req.body;

    // honeypot (spam bots fill hidden fields)
    if (hp) return res.status(200).json({ ok: true });

    // basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required' });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'invalid email' });
    }

    const subject = `New Booking Inquiry from ${name}`;
    const html = `
      <h2>New Booking Inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ''}
      ${date ? `<p><b>Event Date:</b> ${date}</p>` : ''}
      ${venue ? `<p><b>Venue:</b> ${venue}</p>` : ''}
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${message}</pre>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,     // so you can reply directly
      subject,
      html,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Booking mail error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ----- Mongo connection (one time) -----
mongoose.connect(process.env.MONGO_URI); // v7+: no options object needed
mongoose.connection.on('connected', () => console.log('Mongo connected'));
mongoose.connection.on('error', err => console.error('Mongo error:', err));

// ----- Mongoose schema/model -----
const ConcertSchema = new mongoose.Schema({
  title: String,
  date: String,     // consider Date if you want real date sorting
  location: String,
  photo: String,
  url: String
}, { timestamps: true });

const Concert = mongoose.model('Concert', ConcertSchema);

// ----- Health check -----
app.get('/health', (_, res) => res.send('ok'));

// Debug route to check file system (must be before static files)
app.get('/debug', (_, res) => {
  const distPath = path.join(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  let htmlContent = '';
  if (fs.existsSync(indexPath)) {
    htmlContent = fs.readFileSync(indexPath, 'utf8');
  }
  
  res.json({
    currentDir: __dirname,
    distExists: fs.existsSync(distPath),
    indexExists: fs.existsSync(indexPath),
    distContents: fs.existsSync(distPath) ? fs.readdirSync(distPath) : [],
    env: process.env.NODE_ENV || 'development',
    htmlContent: htmlContent.substring(0, 500) + '...' // First 500 chars
  });
});

// ----- Routes -----
app.get('/concerts', async (req, res) => {
  try {
    const concerts = await Concert.find().sort({ date: 1 });
    res.json(concerts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
});

app.post('/concerts', async (req, res) => {
  try {
    const concert = new Concert(req.body);
    await concert.save();
    res.json(concert);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Failed to save concert' });
  }
});

// ----- Static files and catch-all route (placed at the end) -----
const path = require('path');

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
const fs = require('fs');
if (!fs.existsSync(distPath)) {
  console.error('ERROR: dist directory does not exist!');
  console.error('Current directory:', __dirname);
  console.error('Expected dist path:', distPath);
}

// Serve static files with proper MIME types and error handling
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    console.log(`Serving static file: ${filePath}`);
    
    // Set proper MIME types
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  },
  fallthrough: false // Don't fall through to next middleware if file not found
}));

// Error handler for static files
app.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    console.error(`File not found: ${req.url}`);
    return res.status(404).json({ error: 'File not found' });
  }
  next(err);
});

// More specific catch-all route for SPA
app.get('/*', (req, res) => {
  console.log(`Serving index.html for route: ${req.url}`);
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('ERROR: index.html does not exist at:', indexPath);
    return res.status(500).json({ error: 'Frontend not built' });
  }
  
  res.sendFile(indexPath);
});

// ----- Start server -----
const PORT = process.env.PORT || 3001; // Use 3001 as fallback for local development
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API on :${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Dist directory exists: ${fs.existsSync(distPath)}`);
  console.log(`PORT env var: ${process.env.PORT || 'not set'}`);
  
  // List all files in dist directory for debugging
  if (fs.existsSync(distPath)) {
    console.log('Dist directory contents:');
    const listFiles = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          console.log(`${prefix}📁 ${item}/`);
          listFiles(fullPath, prefix + '  ');
        } else {
          console.log(`${prefix}📄 ${item}`);
        }
      });
    };
    listFiles(distPath);
  }
});
