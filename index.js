const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const r2Uploader = require('./r2Uploader');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


console.log('R2 Key loaded?', !!process.env.R2_ACCESS_KEY_ID);

const app = express();

// ----- CORS (one time) -----
const allowedOrigins = [
  'http://localhost:5173',
  'https://musicclubwebsite.onrender.com',
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    // allow REST tools / SSR / health checks with no origin
    if (!origin) return cb(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    
    // Allow any AWS App Runner subdomain
    if (origin && origin.includes('awsapprunner.com')) {
      return cb(null, true);
    }
    
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
}));

// ----- Body parser (one time) -----
app.use(express.json());

// ----- R2 uploader routes -----
app.use('/r2', r2Uploader);

// ----- Mongo connection (one time) -----
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => console.log('Mongo connected'));
mongoose.connection.on('error', err => console.error('Mongo error:', err));

// ----- Mongoose schema/model -----
const eventSchema = new mongoose.Schema({
  img: String,
  title: String,
  date: String,
  location: String,
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

// ----- Health check -----
app.get('/health', (_, res) => res.send('ok'));

// Test API endpoint
app.get('/api-test', (_, res) => {
  res.json({ 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create an event
app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ error: 'Failed to create event' });
  }
});

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

// Test route for CSS file
app.get('/test-css', (_, res) => {
  const cssPath = path.join(__dirname, 'dist', 'assets', 'index-Dal9t9E4.css');
  console.log(`Testing CSS file at: ${cssPath}`);
  console.log(`File exists: ${fs.existsSync(cssPath)}`);
  
  if (fs.existsSync(cssPath)) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(cssPath);
  } else {
    res.status(404).json({ error: 'CSS file not found' });
  }
});

// ----- Static files and catch-all route (placed at the end) -----

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('ERROR: dist directory does not exist!');
  console.error('Current directory:', __dirname);
  console.error('Expected dist path:', distPath);
}

// Direct static file serving - MUST be before express.static
app.get('/assets/*', (req, res) => {
  const filePath = path.join(distPath, req.url);
  console.log(`Direct static file request: ${req.url}`);
  console.log(`Looking for file at: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    console.log(`File exists, serving directly: ${filePath}`);
    const ext = path.extname(filePath);
    
    if (ext === '.css') {
      res.setHeader('Content-Type', 'text/css');
    } else if (ext === '.js') {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (ext === '.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
    
    res.sendFile(filePath);
  } else {
    console.log(`File not found: ${filePath}`);
    res.status(404).json({ error: 'File not found' });
  }
});

// Serve static files with proper MIME types and error handling
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    console.log(`Serving static file: ${filePath}`);
    console.log(`File extension: ${path.extname(filePath)}`);
    
    // Set proper MIME types
    if (filePath.endsWith('.css')) {
      console.log(`Setting CSS MIME type for: ${filePath}`);
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      console.log(`Setting JS MIME type for: ${filePath}`);
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.svg')) {
      console.log(`Setting SVG MIME type for: ${filePath}`);
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filePath.endsWith('.html')) {
      console.log(`Setting HTML MIME type for: ${filePath}`);
      res.setHeader('Content-Type', 'text/html');
    }
  }
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
const PORT = process.env.PORT || 3001; // Match AWS App Runner configuration
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
