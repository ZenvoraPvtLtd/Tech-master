import express from "express";
import adminController from "./admin.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();


router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working",
  });
});
/**
 * Authentication
 */
router.post("/login", adminController.login);

router.post("/forgot-password", adminController.forgotPassword);

router.post("/reset-password/:token",adminController.resetPassword);

router.post("/logout", authMiddleware, adminController.logout);

/**
 * Admin Profile
 */
router.get("/profile", authMiddleware, adminController.getProfile);

/**
 * Change Password
 */
router.put(
  "/change-password",
  authMiddleware,
  adminController.changePassword
);

export default router;     

