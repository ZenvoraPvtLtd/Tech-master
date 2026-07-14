import { getAnalyticsService } from "./analytics.service.js";
import { successResponse } from "../../utils/response.js";

// ==========================
// GET ANALYTICS
// ==========================
export const getAnalytics = async (req, res, next) => {
  try {
    const data = await getAnalyticsService();

    return successResponse(
      res,
      "Analytics fetched successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};