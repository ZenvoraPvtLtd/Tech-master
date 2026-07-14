const express = require('express');
const router = express.Router();
const { getCMSData, updateCMSData } = require('../controllers/cmsController');
const { createEnquiry } = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

router.get('/', getCMSData);
router.post('/update', protect, updateCMSData);
router.post('/public/enquiry', createEnquiry);

module.exports = router;
