import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/database.js";
// import Admin from "../modules/admin/admin.model.js";
import Admin from "../modules/admin/admin.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: " Admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      role: "super_admin",
      isActive: true,
    });
    console.log("Admin Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();