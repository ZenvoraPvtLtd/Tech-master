import ActivityLog from "./activityLog.model.js";

class ActivityLogRepository {
  /**
   * Fetch all logs, sorted by latest first
   */
  async findAll(filter = {}, sort = { createdAt: -1 }) {
    return await ActivityLog.find(filter).sort(sort);
  }

  /**
   * Save a new activity log
   */
  async create(data) {
    return await ActivityLog.create(data);
  }
}

export default new ActivityLogRepository();
