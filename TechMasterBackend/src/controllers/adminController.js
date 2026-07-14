const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "techmaster_secret_jwt_key_123", {
    expiresIn: '30d'
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            status: admin.status
          },
          token: generateToken(admin._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin email or access passphrase.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin profile not found.' });
    }

    const isMatch = await admin.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid current password.' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: 'Administrative password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Email address not registered.' });
    }
    res.json({ success: true, message: 'Mock reset link dispatched to your email address.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
