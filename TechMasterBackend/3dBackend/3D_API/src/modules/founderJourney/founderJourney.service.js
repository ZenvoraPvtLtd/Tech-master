import founderJourneyRepository from "./founderJourney.repository.js";
import deleteFile from "../../utils/deleteFile.js";
import activityLogService from "../activityLog/activityLog.service.js";
import cloudinary from "../../config/cloudinary.js";

class FounderJourneyService {
  /**
   * Get all timeline/milestone items
   */
  async getItems(filter = {}) {
    return await founderJourneyRepository.findAllItems(filter, {
      order: 1,
      year: 1,
    });
  }

  /**
   * Create Item
   */
  async createItem(itemData, admin) {
    const maxOrder = await founderJourneyRepository.findMaxOrder(itemData.type);

    const item = await founderJourneyRepository.createItem({
      ...itemData,
      order: maxOrder + 1,
    });

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Create Item",
        item._id,
        `Created journey milestone "${item.title}"`
      );
    }

    return item;
  }

  /**
   * Update Item
   */
  async updateItem(id, updateData, admin) {
    const item = await founderJourneyRepository.findItemById(id);

    if (!item) {
      throw new Error("Milestone/timeline node not found");
    }

    // delete previous cloudinary image
    if (
      updateData.image?.public_id &&
      item.image?.public_id &&
      updateData.image.public_id !== item.image.public_id
    ) {
      try {
        await deleteFile(item.image.public_id);
      } catch (err) {
        console.error(err);
      }
    }

    const updatedItem = await founderJourneyRepository.updateItem(id, updateData);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Update Item",
        updatedItem._id,
        `Updated "${updatedItem.title}"`
      );
    }

    return updatedItem;
  }

  /**
   * Delete Item
   */
  async deleteItem(id, admin) {
    const item = await founderJourneyRepository.findItemById(id);

    if (!item) {
      throw new Error("Milestone/timeline node not found");
    }

    if (item.image?.public_id) {
      try {
        await deleteFile(item.image.public_id);
      } catch (err) {
        console.error(err);
      }
    }

    await founderJourneyRepository.deleteItem(id);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Delete Item",
        item._id,
        `Deleted "${item.title}"`
      );
    }

    return true;
  }

  /**
   * Toggle Status
   */
  async toggleItemStatus(id, admin) {
    const item = await founderJourneyRepository.findItemById(id);

    if (!item) {
      throw new Error("Item not found");
    }

    item.isActive = !item.isActive;

    const updatedItem = await founderJourneyRepository.save(item);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Toggle Status",
        updatedItem._id,
        `${updatedItem.title} is now ${
          updatedItem.isActive ? "Active" : "Inactive"
        }`
      );
    }

    return updatedItem;
  }

  /**
   * Reorder
   */
  async reorderItems(id, direction, admin) {
    const item = await founderJourneyRepository.findItemById(id);

    if (!item) {
      throw new Error("Item not found");
    }

    const items = await founderJourneyRepository.findAllItems(
      { type: item.type },
      { order: 1 }
    );

    const currentIndex = items.findIndex(
      (i) => i._id.toString() === id
    );

    if (currentIndex === -1) {
      throw new Error("Item not found");
    }

    let targetIndex = -1;

    if (direction === "up" && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    }

    if (direction === "down" && currentIndex < items.length - 1) {
      targetIndex = currentIndex + 1;
    }

    if (targetIndex !== -1) {
      const target = items[targetIndex];

      [item.order, target.order] = [target.order, item.order];

      await founderJourneyRepository.save(item);
      await founderJourneyRepository.save(target);
    }

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reorder",
        item._id,
        `${item.title} moved ${direction}`
      );
    }

    return await founderJourneyRepository.findAllItems(
      { type: item.type },
      { order: 1 }
    );
  }

  /**
   * Get Settings
   */
  async getSettings() {
    return await founderJourneyRepository.getSettings();
  }

  /**
   * Update Settings
   */
  async updateSettings(settingsData, admin) {
    const currentSettings = await founderJourneyRepository.getSettings();

    if (
      settingsData.futureVision?.image?.public_id &&
      currentSettings.futureVision?.image?.public_id &&
      settingsData.futureVision.image.public_id !==
        currentSettings.futureVision.image.public_id
    ) {
      try {
        await deleteFile(currentSettings.futureVision.image.public_id);
      } catch (err) {
        console.error(err);
      }
    }

    const updatedSettings =
      await founderJourneyRepository.updateSettings(settingsData);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Update Settings",
        updatedSettings._id,
        "Founder Journey settings updated"
      );
    }

    return updatedSettings;
  }

  /**
   * Publish Live
   */
  async publishLive(admin) {
    const settings = await founderJourneyRepository.getSettings();

    settings.isDraft = false;

    const saved = await founderJourneyRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Publish Live",
        saved._id,
        "Founder Journey published"
      );
    }

    return saved;
  }

  /**
   * Upload Media
   */
  async uploadMedia(id, file, admin) {
    const item = await founderJourneyRepository.findItemById(id);

    if (!item) {
      throw new Error("Milestone/timeline node not found");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "founder-journey",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    // Delete previous image
    if (item.image?.public_id) {
      try {
        await deleteFile(item.image.public_id);
      } catch (err) {
        console.error(err);
      }
    }

    item.image = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };

    const updatedItem = await founderJourneyRepository.save(item);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Upload Media",
        updatedItem._id,
        `Uploaded media for "${updatedItem.title}"`
      );
    }

    return updatedItem;
  }
}

export default new FounderJourneyService();