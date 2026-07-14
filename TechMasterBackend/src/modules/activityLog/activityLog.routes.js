import express from "express";
import activityLogController from "./activityLog.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// Fetch logs (restricted to authenticated admins)
router.get("/", authMiddleware, activityLogController.getLogs);

export default router;
