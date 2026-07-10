import activityLogRepository from "./activityLog.repository.js";
import adminRepository from "../admin/admin.repository.js";

class ActivityLogService {
  /**
   * Retrieve all activity logs
   */
  async getLogs(filter = {}) {
    return await activityLogRepository.findAll(filter);
  }

  /**
   * Write a new log entry to the database
   */
  async logAction(adminId, action, itemId = null, details = "", module = "Founder Journey") {
    try {
      const admin = await adminRepository.findById(adminId);
      const adminName = admin ? admin.name : "Unknown Admin";

      await activityLogRepository.create({
        adminId,
        adminName,
        action,
        module,
        itemId,
        details,
      });
    } catch (error) {
      console.error("Failed to write activity log:", error);
    }
  }
}

export default new ActivityLogService();
