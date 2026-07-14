import founderJourneyService from "./founderJourney.service.js";

class FounderJourneyController {
  /**
   * Fetch all timeline/milestone items
   */
  async getItems(req, res, next) {
    try {
      const { type, status } = req.query;
      const filter = {};
      if (type) filter.type = type;
      if (status !== undefined) filter.status = status;

      const items = await founderJourneyService.getItems(filter);

      return res.status(200).json({
        success: true,
        message: "Founder journey items fetched successfully",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new journey item (timeline or milestones)
   */
  async createItem(req, res, next) {
    try {
      const item = await founderJourneyService.createItem(req.body, req.admin);

      return res.status(201).json({
        success: true,
        message: "Founder journey item created successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an existing journey item
   */
  async updateItem(req, res, next) {
    try {
      const { id } = req.params;
      const updatedItem = await founderJourneyService.updateItem(id, req.body, req.admin);

      return res.status(200).json({
        success: true,
        message: "Founder journey item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a journey item
   */
  async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      await founderJourneyService.deleteItem(id, req.admin);

      return res.status(200).json({
        success: true,
        message: "Founder journey item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Toggle item visibility (Active/Inactive status)
   */
  async toggleItemStatus(req, res, next) {
    try {
      const { id } = req.params;
      const updatedItem = await founderJourneyService.toggleItemStatus(id, req.admin);

      return res.status(200).json({
        success: true,
        message: `Item visibility changed to ${updatedItem.status ? "Active" : "Inactive"}`,
        data: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reorder items (Move chronological sequence indices)
   */
  async reorderItems(req, res, next) {
    try {
      const { id, direction } = req.body;
      const updatedItems = await founderJourneyService.reorderItems(id, direction, req.admin);

      return res.status(200).json({
        success: true,
        message: "Founder journey items reordered successfully",
        data: updatedItems,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch current page-level layout settings
   */
  async getSettings(req, res, next) {
    try {
      const settings = await founderJourneyService.getSettings();

      return res.status(200).json({
        success: true,
        message: "Founder journey settings fetched successfully",
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update page settings & Future Vision content
   */
  async updateSettings(req, res, next) {
    try {
      const settings = await founderJourneyService.updateSettings(req.body, req.admin);

      return res.status(200).json({
        success: true,
        message: "Founder journey settings updated successfully",
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Publish workspace configurations live
   */
  async publishLive(req, res, next) {
    try {
      const settings = await founderJourneyService.publishLive(req.admin);

      return res.status(200).json({
        success: true,
        message: "Founder journey layout published live successfully",
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload media for a timeline/milestone item
   */
  async uploadMedia(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const { id } = req.params;
      const updatedItem = await founderJourneyService.uploadMedia(id, req.file, req.admin);

      return res.status(200).json({
        success: true,
        message: "Media uploaded successfully",
        data: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FounderJourneyController();
