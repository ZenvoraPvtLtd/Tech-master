import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});