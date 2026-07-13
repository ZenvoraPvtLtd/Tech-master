import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { initCloudinary } from "./src/config/cloudinary.js";
import authRoutes from "./src/routes/auth.routes.js";
import cmsRoutes from "./src/routes/cms.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5180"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Connect DB & Config Cloudinary
await connectDB();
initCloudinary();

// Mount Routes
app.use("/api/v1/admin", authRoutes);
app.use("/api/v1/cms", cmsRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Simplified Backend is Running...",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack || err.message);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
