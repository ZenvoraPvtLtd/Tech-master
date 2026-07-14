const CMSData = require('../models/CMSData');

exports.getCMSData = async (req, res) => {
  try {
    const list = await CMSData.find({});
    const db = {};
    list.forEach(item => {
      db[item.key] = item.value;
    });
    res.json({ success: true, data: db });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCMSData = async (req, res) => {
  const { key, value } = req.body;

  try {
    if (!key) {
      return res.status(400).json({ success: false, message: "Field key parameter is missing." });
    }

    let cmsItem = await CMSData.findOne({ key });
    if (cmsItem) {
      cmsItem.value = value;
      await cmsItem.save();
    } else {
      cmsItem = await CMSData.create({ key, value });
    }

    res.json({ success: true, message: `Field ${key} synchronized successfully.`, data: cmsItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
