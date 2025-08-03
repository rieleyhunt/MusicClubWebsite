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

// ----- Start server -----
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API on :${PORT}`));
