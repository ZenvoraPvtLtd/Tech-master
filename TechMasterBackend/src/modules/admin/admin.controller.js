// import adminService from "./admin.service.js";
import adminService from "./admin.service.js";
class AdminController {
  /**
   * Admin Login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await adminService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Admin Profile
   */
  async getProfile(req, res, next) {
    try {
      const admin = await adminService.getProfile(req.admin.id);

      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Change Password
   */
  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      const data = await adminService.changePassword(
        req.admin.id,
        oldPassword,
        newPassword,
        confirmPassword
      );

      return res.status(200).json({
        success: true,
        message: data.message,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const data = await adminService.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: "Password reset link sent successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  /** * resetPassword */
  /**
 * Reset Password
 */
async resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const data = await adminService.resetPassword(
      token,
      password,
      confirmPassword
    );

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
}

  /**
   * Logout
   */
  async logout(req, res, next) {
    try {
      const data = await adminService.logout();

      return res.status(200).json({
        success: true,
        message: data.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();