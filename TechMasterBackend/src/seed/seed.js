import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../modules/admin/admin.model.js";
import CMSData from "../models/CMS.js";
import { initialData } from "../../../zenvora3d/src/utils/initialData.js";

const runSeed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    console.log("🧹 Cleaning Admin collection...");
    await Admin.deleteMany({});
    
    console.log("👤 Seeding Admin User...");
    const adminUser = await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      role: "super_admin",
      isActive: true,
    });
    console.log(`✅ Default Admin user created: ${adminUser.email}`);

    console.log("🧹 Cleaning CMSData collection...");
    await CMSData.deleteMany({});

    console.log("🌱 Seeding CMS initial configurations...");
    for (const [key, value] of Object.entries(initialData)) {
      await CMSData.create({
        key,
        data: value,
      });
      console.log(`✅ Seeded key: ${key}`);
    }

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
