import mongoose from "mongoose";

const masterEventSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const workshopSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const conferenceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const bookingRequestSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const eventsPageSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

/* ===========================
   EXPORT MODELS
=========================== */

export const MasterEvent = mongoose.model("MasterEvent", masterEventSchema);
export const Workshop = mongoose.model("Workshop", workshopSchema);
export const Conference = mongoose.model("Conference", conferenceSchema);
export const BookingRequest = mongoose.model("BookingRequest", bookingRequestSchema);
export const EventsPage = mongoose.model("EventsPage", eventsPageSchema);
