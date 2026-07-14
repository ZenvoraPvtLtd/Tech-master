const Enquiry = require('../models/Enquiry');
const CMSData = require('../models/CMSData');

exports.createEnquiry = async (req, res) => {
  const { name, email, category, company, message } = req.body;

  try {
    const enquiry = await Enquiry.create({ name, email, category, company, message });

    // Sync back to db.enquiries array to ensure CMS panels show the new entries instantly
    let enquiriesData = await CMSData.findOne({ key: "enquiries" });
    const newRecord = {
      id: `enq-${Date.now()}`,
      name,
      email,
      category,
      company,
      message,
      status: "Unread",
      createdAt: new Date().toISOString()
    };

    if (enquiriesData) {
      const list = Array.isArray(enquiriesData.value) ? enquiriesData.value : [];
      enquiriesData.value = [newRecord, ...list];
      await enquiriesData.save();
    } else {
      await CMSData.create({ key: "enquiries", value: [newRecord] });
    }

    res.status(201).json({ success: true, message: "Enquiry submitted successfully.", data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
