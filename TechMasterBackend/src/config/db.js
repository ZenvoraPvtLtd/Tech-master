const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://Noopur_11:Gunu%40123@cluster0.zsrsakf.mongodb.net/3d_api?appName=Cluster0&retryWrites=true&w=majority";
    await mongoose.connect(mongoURI);
    console.log("MongoDB cluster connection established successfully.");
  } catch (err) {
    console.error("MongoDB connection failure:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
