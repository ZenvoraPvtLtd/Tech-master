import Admin from "./admin.model.js";

class AdminRepository {
  /**
   * Find admin by email
   */
  async findByEmail(email) {
    return await Admin.findOne({ email }).select("+password");
  }

async findById(id) {
  return await Admin.findById(id).select("+password");
}
  /**
   * Create admin
   */
  async create(adminData) {
    return await Admin.create(adminData);
  }

  /**
   * Update admin
   */
  async update(id, data) {
    return await Admin.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
 * Find admin by reset token
 */
async findByResetToken(token) {
  return await Admin.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");
}

  /**
   * Save admin document
   */
  async save(admin) {
    return await admin.save();
  }
}

export default new AdminRepository();