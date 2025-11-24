const path = require('path');
const express = require('express');
require('dotenv').config();

const courseRoutes = require('./routes/courseRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const publicDir = path.join(__dirname, 'public');

app.use(express.json());

// Simple logging middleware so students can see each request and why middleware is useful.
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next(); // hand off to the next middleware/route handler
});

app.use(express.static(publicDir));

// Basic pages ---------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(publicDir, 'home.html'));
});

// API routes ----------------------------------------------------------------
app.use('/api/courses', courseRoutes);
app.use('/api/posts', postRoutes);

// Fallback ------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
