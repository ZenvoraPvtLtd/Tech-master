

// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./src/config/database.js";

// const PORT = process.env.PORT || 5000;

// // Connect MongoDB
// await connectDB();

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/database.js";
import { initCloudinary } from "./src/config/cloudinary.js";

const PORT = process.env.PORT || 5000;

// Connect Database
await connectDB();

// Configure Cloudinary
initCloudinary();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});