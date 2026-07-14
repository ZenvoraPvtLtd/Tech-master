const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const seedDatabase = require('./src/seed/seed');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all cross origin connections for development ease
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/v1/admin', require('./src/routes/adminRoutes'));
app.use('/api/v1/cms', require('./src/routes/cmsRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect DB
  await connectDB();
  
  // Seed initial configs
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Backend server successfully active on port ${PORT}`);
  });
};

startServer();
