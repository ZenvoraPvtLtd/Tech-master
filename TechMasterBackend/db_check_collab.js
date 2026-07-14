import mongoose from "mongoose";
import Collaboration from "./src/modules/collabration/collaboration.model.js";

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/3d_api");
  const collaboration = await Collaboration.findOne();
  if (!collaboration) {
    console.log("No Collaboration document found in DB.");
  } else {
    console.log("Collaboration document in DB:");
    console.log(JSON.stringify(collaboration, null, 2));
  }
  await mongoose.disconnect();
}

run().catch(console.error);
