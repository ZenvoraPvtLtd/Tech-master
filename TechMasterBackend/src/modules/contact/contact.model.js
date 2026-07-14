import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);
