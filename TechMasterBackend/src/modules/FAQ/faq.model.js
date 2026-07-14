import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const enquirySchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const FAQ = mongoose.model("FAQ", faqSchema);
const Enquiry = mongoose.model("Enquiry", enquirySchema);

export { Enquiry };
export default FAQ;