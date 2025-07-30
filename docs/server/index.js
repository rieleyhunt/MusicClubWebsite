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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on :${PORT}`));
