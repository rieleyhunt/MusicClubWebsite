const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const r2Uploader = require('./r2Uploader');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


console.log('R2 Key loaded?', !!process.env.CF_ACCESS_KEY_ID);

const app = express();

// ----- CORS (one time) -----
const allowedOrigins = [
  'http://localhost:5173',
  'https://musicclubwebsite-frontend.onrender.com',
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
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

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const url = await r2Uploader(req.file);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ----- Mongo connection (one time) -----
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => console.log('Mongo connected'));
mongoose.connection.on('error', err => console.error('Mongo error:', err));

mongoose.connection.once("open", () => {
  console.log("Mongo DB name:", mongoose.connection.name);
});

// ----- Mongoose schema/model -----
const eventSchema = new mongoose.Schema({
  img: String,
  title: String,
  date: String,
  location: String,
}, { timestamps: true });

const execSchema = new mongoose.Schema({
  img: String,
  name: String,
  role: String,
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
const Exec = mongoose.model('Exec', execSchema);

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

// Delete an event
app.delete('/events', async (req, res) => {
  try {
    console.log(await Event.find());
    console.log("trying to fuck");
    console.log(req.body.title);
    const deletedEvent = await Event.findOneAndDelete({ title: req.body.title });
    if (!deletedEvent) {
      console.error("Could not find event:", req.body.title);
      return res.status(404).json({ error: "Could not find event" });
    }
  } catch (err) {
    console.error("Error deleting event", err);
    return res.status(500).json({ error: "Error deleting event"})
  }
});

// Get all execs
app.get('/execs', async (req, res) => {
  try {
    const execs = await Exec.find().sort({ createdAt: -1 });
    res.json(execs);
  } catch (err) {
    console.error('Error fetching execs:', err);
    res.status(500).json({ error: 'Failed to fetch execs' });
  }
});

// Create an exec
app.post('/execs', async (req, res) => {
  try {
    const exec = new Exec(req.body);
    await exec.save();
    res.status(201).json(exec);
  } catch (err) {
    console.error('Error creating exec: ', err);
    res.status(400).json({ error: 'Failed to create exec' });
  }
});

// Delete an exec
app.delete('/execs', async (req, res) => {
  try {
    const deletedExec = Exec.findOneAndDelete({ name: req.name })
    if (!deletedExec) {
      console.error("Exec", req.name, "not found");
      return res.status(404).json({ error: `Exec ${req.name} not found `});
    }
  } catch (err) {
    console.error("There was a problem deleting an exec");
    return res.status(500).json({ error: "There was a problem deleting an exec" });
  }
});

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

// ----- Authentication -----
const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD;

// LOGIN ENDPOINT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUsername)
    return res.status(401).json({ error: "Invalid Credentials" })
  console.log(username);

  const valid = await bcrypt.compare(password, adminPasswordHash);
  console.log(valid);
  if (!valid)
    return res.status(401).json({ error: "Invalid Credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/admin", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send("Unauthorized");

  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Welcome to the admin dashboard!!!" }); 
  } catch {
    res.status(401).send("Invalid token");
  }
});

// ----- Start server -----
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API on :${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`PORT env var: ${process.env.PORT || 'not set'}`);
});