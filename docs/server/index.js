const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const r2Uploader = require('./r2Uploader');
require('dotenv').config();
console.log('R2 Key loaded?', process.env.R2_ACCESS_KEY_ID);

const app = express(); // Creates an Express object
app.use(cors()); // Allows the backend to talk to the front end
app.use(express.json()); // Parse incoming JSON data automatically

app.use('/r2', r2Uploader);
app.use(cors({ origin: ['http://localhost:5173', 'https://yourdomain.com'] }));


mongoose.connect(process.env.MONGO_URI, {

});

const allowedOrigins = [
  'http://localhost:5173',               // dev
  'https://your-frontend-domain.com'     // prod
];

app.use(cors({
  origin: allowedOrigins,
  credentials: false
}));
app.use(express.json());

const ConcertSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  photo: String,
});

const Concert = mongoose.model('Concert', ConcertSchema);

// health check (useful for Render/Railway)
app.get('/health', (_, res) => res.send('ok'));

mongoose.connect(process.env.MONGO_URI); // v7+: no options needed
mongoose.connection.on('connected', () => console.log('Mongo connected'));
mongoose.connection.on('error', err => console.error('Mongo error:', err));

app.get('/concerts', async (req, res) => {
  const concerts = await Concert.find().sort({ date: 1 });
  res.json(concerts);
});

app.post('/concerts', async (req, res) => {
  const concert = new Concert(req.body);
  await concert.save();
  res.json(concert);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on :${PORT}`));