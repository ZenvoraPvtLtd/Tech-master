require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const adminRoutes = require('./routes/adminRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Prevent client and intermediate caches from storing stale CMS data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Connect to MongoDB
connectDB();

// Base route for health check
app.get('/', (req, res) => {
  res.send('TechMaster Backend API is running');
});

// Register API routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/cms', cmsRoutes);

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
