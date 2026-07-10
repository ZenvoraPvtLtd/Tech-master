import crypto from "crypto";
// import adminRepository from "./admin.repository.js";
import adminRepository from "./admin.repository.js";
import generateToken from "../../utils/generateToken.js";

class AdminService {
  /**
   * Admin Login
   */
  async login(email, password) {
    const admin = await adminRepository.findByEmail(email);

    if (!admin) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await admin.comparePassword(password);

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    if (!admin.isActive) {
      throw new Error("Admin account is inactive");
    }

    admin.lastLogin = new Date();

    await adminRepository.save(admin);

    // const token = generateToken(admin._id);
    const token = generateToken({
  id: admin._id,
  role: admin.role,
});

    return {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  /**
   * Admin Profile
   */
  async getProfile(adminId) {
    const admin = await adminRepository.findById(adminId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  }

  /**
   * Change Password
   */
  async changePassword(
    adminId,
    oldPassword,
    newPassword,
    confirmPassword
  ) {
    console.log("Email:", email);

    const admin = await adminRepository.findById(adminId);

    console.log("Admin:", admin);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const isMatched = await admin.comparePassword(oldPassword);

console.log("Password Matched:", isPasswordMatched);
    if (!isMatched) {
      throw new Error("Old password is incorrect");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    admin.password = newPassword;

    await adminRepository.save(admin);

    return {
      message: "Password changed successfully",
    };
  }

  /**
   * Forgot Password
   */
  async forgotPassword(email) {
    const admin = await adminRepository.findByEmail(email);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetPasswordToken = resetToken;

    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await adminRepository.save(admin);

    return {
      resetToken,
    };
  }
  /**
   * Reset Password
   */
/**
 * Reset Password
 */
async resetPassword(token, password, confirmPassword) {
  // Find admin using reset token
  const admin = await adminRepository.findByResetToken(token);

  if (!admin) {
    throw new Error("Invalid or expired reset token");
  }

  // Check password match
  if (password !== confirmPassword) {
    throw new Error("Password and Confirm Password do not match");
  }

  // Update password
  admin.password = password;

  // Clear reset token
  admin.resetPasswordToken = null;
  admin.resetPasswordExpire = null;

  // Save admin (password hash model ke pre-save hook se ho jayega)
  await adminRepository.save(admin);

  return {
    message: "Password reset successfully",
  };
}
  /**
   * Logout
   */
  async logout() {
    return {
      message: "Logout successful",
    };
  }
}

export default new AdminService();