const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "general"
  },
  company: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Unread" // Unread, Read
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', EnquirySchema);
