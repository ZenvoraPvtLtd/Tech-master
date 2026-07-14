const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const CMSData = require('../models/CMSData');

// Load initial database data dynamically from the frontend workspace to ensure 100% sync
let initialDatabaseData = {};
try {
  const initialDataPath = path.resolve(__dirname, '../../../zenvora3d/src/utils/initialData.js');
  if (fs.existsSync(initialDataPath)) {
    const fileContent = fs.readFileSync(initialDataPath, 'utf8');
    // Convert ES Modules "export const initialData = {" to CommonJS "module.exports = {"
    const commonJSContent = fileContent
      .replace(/export\s+const\s+initialData\s*=/, 'const initialData =') 
      + '\nmodule.exports = initialData;';
    
    const tempFilePath = path.resolve(__dirname, './initialData.temp.js');
    fs.writeFileSync(tempFilePath, commonJSContent, 'utf8');
    initialDatabaseData = require(tempFilePath);
    try { fs.unlinkSync(tempFilePath); } catch (e) {}
    console.log(`Loaded initial database data dynamically: ${Object.keys(initialDatabaseData).length} keys found.`);
  } else {
    console.warn("Could not find initialData.js in zenvora3d workspace.");
  }
} catch (error) {
  console.error("Error loading dynamic initialData.js:", error.message);
}

const seedDatabase = async () => {
  try {
    // 1. Seed Master Admin
    const adminExists = await Admin.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      await Admin.create({
        name: "Aman Master",
        email: "admin@gmail.com",
        password: "Admin@123", // Password automatically gets encrypted pre-save
        role: "Master Admin",
        status: "Active"
      });
      console.log("Master Admin user seeded successfully (admin@gmail.com / Admin@123).");
    }

    // 2. Seed CMS sections if empty
    for (const key of Object.keys(initialDatabaseData)) {
      const exists = await CMSData.findOne({ key });
      if (!exists) {
        await CMSData.create({ key, value: initialDatabaseData[key] });
        console.log(`Seeded CMS section key: ${key}`);
      }
    }
    console.log("Database seeding tasks completed successfully.");
  } catch (err) {
    console.error("Failed to seed database:", err.message);
  }
};

module.exports = seedDatabase;
