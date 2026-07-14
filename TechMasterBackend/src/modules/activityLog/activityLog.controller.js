import activityLogService from "./activityLog.service.js";

class ActivityLogController {
  /**
   * Fetch all logs sorted by latest first
   */
  async getLogs(req, res, next) {
    try {

      const { module } = req.query;

      const logs = await activityLogService.getLogs();

      return res.status(200).json({
        success: true,
        message: "Activity logs fetched successfully",
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ActivityLogController();
