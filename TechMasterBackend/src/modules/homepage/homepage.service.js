import homepageRepository from "./homepage.repository.js";
import deleteFile from "../../utils/deleteFile.js";
import activityLogService from "../activityLog/activityLog.service.js";
import cloudinary from "../../config/cloudinary.js";
import MESSAGES from "../../constants/message.js";

const LOG_MODULE = "Homepage";

class HomepageService {
  /**
   * Get Settings
   */
  async getSettings() {
    return await homepageRepository.getSettings();
  }

  /**
   * Update Settings
   */
  async updateSettings(settingsData, admin) {
    
    const currentSettings = await homepageRepository.getSettings();

    await this._safeDelete(currentSettings.heroSection?.media?.public_id);

    const updatedSettings = await homepageRepository.updateSettings(settingsData);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Updated",
        updatedSettings._id,
        MESSAGES.HOMEPAGE_UPDATED,
        LOG_MODULE
      );
    }

    return updatedSettings;
  }

  /**
   * Publish Live
   */
  async publishLive(admin) {
    const settings = await homepageRepository.getPublicSettings();
    settings.isDraft = false;
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Published",
        saved._id,
        MESSAGES.HOMEPAGE_PUBLISHED,
        LOG_MODULE
      );
    }

    return saved;
  }

  /**
   * Add Section
   */
  async addSection(sectionData, admin) {
    const settings = await homepageRepository.getSettings();
    
    // Check if section type already exists (assuming one of each type)
    const existing = settings.sections.find(s => s.type === sectionData.type);
    if (existing) {
      throw new Error(`Section ${sectionData.type} already exists`);
    }

    const newSection = {
      type: sectionData.type,
      customName: sectionData.customName || "",
      order: sectionData.order !== undefined ? sectionData.order : settings.sections.length + 1,
      isActive: true
    };

    settings.sections.push(newSection);
    
    // Reorder just in case there are duplicates in ordering
    settings.sections.forEach((section, index) => {
      section.order = index + 1;
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Section Added",
        saved._id,
        `${sectionData.customName || sectionData.type} section created.`,
        LOG_MODULE
      );
    }

    return saved;
  }

  /**
   * Delete Section
   */
  async deleteSection(type, admin) {
    const settings = await homepageRepository.getSettings();
    
    const initialLength = settings.sections.length;
    settings.sections = settings.sections.filter(s => s.type !== type);
    
    if (settings.sections.length === initialLength) {
      throw new Error("Section not found");
    }

    // Re-adjust ordering for remaining sections
    settings.sections.sort((a, b) => a.order - b.order);
    settings.sections.forEach((s, index) => {
      s.order = index + 1;
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Section Deleted",
        saved._id,
        `${type} section deleted.`,
        LOG_MODULE
      );
    }

    return saved;
  }

  /**
   * Reorder Sections
   */
  async reorderSections(sectionType, direction, admin) {
    const settings = await homepageRepository.getSettings();
    
    const sections = [...settings.sections];
    sections.sort((a, b) => a.order - b.order);

    const currentIndex = sections.findIndex((s) => s.type === sectionType);
    if (currentIndex === -1) {
      throw new Error("Section not found");
    }

    let targetIndex = -1;
    if (direction === "up" && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    } else if (direction === "down" && currentIndex < sections.length - 1) {
      targetIndex = currentIndex + 1;
    }

    if (targetIndex !== -1) {
      const target = sections[targetIndex];
      const current = sections[currentIndex];
      
      const tempOrder = current.order;
      current.order = target.order;
      target.order = tempOrder;

      settings.sections = sections;
      await homepageRepository.save(settings);
    }

    if (admin && targetIndex !== -1) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Section Reordered",
        settings._id,
        `${sectionType} moved ${direction}`,
        LOG_MODULE
      );
    }

    return settings.sections.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle Section Visibility
   */
  async toggleSectionStatus(sectionType, admin) {
    const settings = await homepageRepository.getSettings();
    
    const section = settings.sections.find((s) => s.type === sectionType);
    if (!section) {
      throw new Error("Section not found");
    }

    section.isActive = !section.isActive;
    await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Section Visibility Changed",
        settings._id,
        `${sectionType} visibility changed to ${section.isActive ? "Active" : "Inactive"}`,
        LOG_MODULE
      );
    }

    return settings.sections.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload Hero Media
   */
  async uploadMedia(file, admin) {
    const settings = await homepageRepository.getSettings();

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "homepage" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    // if (settings.heroSection?.media?.public_id) {
    //   try {
    //     await deleteFile(settings.heroSection.media.public_id);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    await this._safeDelete(settings.heroSection?.media?.public_id);

    settings.heroSection.media = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      type: uploadResult.resource_type === "video" ? "video" : "image",
    };

    const savedSettings = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Media Uploaded",
        savedSettings._id,
        MESSAGES.HOMEPAGE_MEDIA_UPLOADED,
        LOG_MODULE
      );
    }

    return savedSettings;
  }

  /**
   * Get Preview / Public
   */
  async getPreviewOrPublic() {
    const settings = await homepageRepository.getSettings();
    
    // Return only active sections ordered by order
    const activeSections = settings.sections
      .filter(s => s.isActive)
      .sort((a, b) => a.order - b.order);

    return {
      heroSection: settings.heroSection,
      sections: activeSections,
      isDraft: settings.isDraft,
    };
  }

  /**
   * Reset Homepage
   */
  async resetHomepage(admin) {
    const settings = await homepageRepository.getSettings();
    
    // Delete current hero image if it exists to prevent orphan files
    // if (settings.heroSection?.media?.public_id) {
    //   try {
    //     await deleteFile(settings.heroSection.media.public_id);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    await this._safeDelete(settings.heroSection?.media?.public_id);

    const defaultSections = [
      "hero",
      "featured_services",
      "journey_highlights",
      "brand_collaborations",
      "featured_campaigns",
      "testimonials",
      "statistics",
      "newsletter",
      "contact",
    ].map((type, index) => ({ type, customName: "", isActive: true, order: index + 1 }));

    settings.heroSection = {
      title: "Immersive 3D Experience",
      subtitle: "Welcome to the future",
      description: "Explore our latest works and innovations.",
      media: { url: "", public_id: "", type: "image" },
    };
    settings.sections = defaultSections;
    settings.isDraft = true;

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Homepage Reset",
        saved._id,
        "Homepage restored to default state.",
        LOG_MODULE
      );
    }

    return saved;
  }

  /**
   * Get Homepage Logs
   */
  async getLogs() {
    // Rely on ActivityLogService to fetch logs for this module
    return await activityLogService.getLogs({ module: LOG_MODULE });
  }

  // ─────────────────────────────────────────────
  //  PRIVATE HELPERS
  // ─────────────────────────────────────────────

  /**
   * Upload a file buffer to Cloudinary using upload_stream.
   * Supports both image and video via resource_type: "auto".
   */
  async _uploadToCloudinary(file, folder = "homepage") {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });
  }
        async _safeDelete(publicId) {
  if (!publicId) return;

  try {
    await deleteFile(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
  }
}
  // ─────────────────────────────────────────────
  //  VIDEO SLIDER
  // ─────────────────────────────────────────────

  /**
   * Get all Video Sliders sorted by order
   */
  async getVideoSliders() {
    return await homepageRepository.getVideoSliders();
  }

  /**
   * Get a single Video Slider by ID
   */
  async getVideoSliderById(id) {
    return await homepageRepository.getVideoSliderById(id);
  }

  /**
   * Add a new Video Slider with optional video and thumbnail uploads
   */
  async addVideoSlider(data, files, admin) {
    if (!data?.title) {
      const error = new Error("Video slider title is required");
      error.statusCode = 400;
      throw error;
    }

    const settings = await homepageRepository.getSettings();

    // Build the new item with defaults
    const newItem = {
      title: data.title,
      description: data.description || "",
      order:
        data.order !== undefined
          ? Number(data.order)
          : settings.videoSlider.length + 1,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      video: { url: "", public_id: "", type: "video" },
      thumbnail: { url: "", public_id: "" },
    };

    // Upload video to Cloudinary if provided
    if (files?.video?.[0]) {
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/video-slider"
      );
      newItem.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Upload thumbnail to Cloudinary if provided
    if (files?.thumbnail?.[0]) {
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/video-slider"
      );
      newItem.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    settings.videoSlider.push(newItem);
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Created",
        saved._id,
        `Video slider "${newItem.title}" created.`,
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Update an existing Video Slider item.
   * Deletes old Cloudinary media before uploading new files.
   */
  async updateVideoSlider(id, data, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");

    // Replace video: delete old from Cloudinary, upload new
    if (files?.video?.[0]) {
      // if (item.video?.public_id) {
      //   try {
      //     await deleteFile(item.video.public_id);
      //   } catch (err) {
      //     console.error("Failed to delete old video from Cloudinary:", err);
      //   }
      // }
      await this._safeDelete(item.video?.public_id);


      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/video-slider"
      );
      item.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Replace thumbnail: delete old from Cloudinary, upload new
    if (files?.thumbnail?.[0]) {
      // if (item.thumbnail?.public_id) {
      //   try {
      //     await deleteFile(item.thumbnail.public_id);
      //   } catch (err) {
      //     console.error("Failed to delete old thumbnail from Cloudinary:", err);
      //   }
      // }
      await this._safeDelete(item.thumbnail?.public_id);

      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/video-slider"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update text / meta fields
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.order !== undefined) item.order = Number(data.order);
    if (data.isActive !== undefined) item.isActive = Boolean(data.isActive);

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Updated",
        id,
        `Video slider "${item.title}" updated.`,
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Delete a Video Slider item and its associated Cloudinary media
   */
  async deleteVideoSlider(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");

    const title = item.title;

    // Delete video from Cloudinary
    if (item.video?.public_id) {
      try {
        await deleteFile(item.video.public_id);
      } catch (err) {
        console.error("Failed to delete video from Cloudinary:", err);
      }
    }

    // Delete thumbnail from Cloudinary
    if (item.thumbnail?.public_id) {
      try {
        await deleteFile(item.thumbnail.public_id);
      } catch (err) {
        console.error("Failed to delete thumbnail from Cloudinary:", err);
      }
    }

    // Remove item from array
    settings.videoSlider = settings.videoSlider.filter(
      (v) => v._id.toString() !== id
    );
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Deleted",
        id,
        `Video slider "${title}" deleted.`,
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle isActive status of a Video Slider item
   */
  async toggleVideoSlider(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");

    item.isActive = !item.isActive;
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Toggled",
        id,
        `Video slider "${item.title}" visibility changed to ${
          item.isActive ? "Active" : "Inactive"
        }.`,
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Reorder Video Sliders by supplying an array of { id, order } pairs
   */
  async reorderVideoSlider(items, admin) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Reorder items must be a non-empty array");
    }

    const settings = await homepageRepository.getSettings();

    items.forEach(({ id, order }) => {
      const item = settings.videoSlider.id(id);
      if (item) item.order = Number(order);
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Reordered",
        saved._id,
        "Video sliders reordered.",
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload video and/or thumbnail for an existing Video Slider item.
   * Deletes old Cloudinary files before uploading new ones.
   */
  async uploadVideoSliderMedia(id, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");

    // Upload new video
    if (files?.video?.[0]) {
      if (item.video?.public_id) {
        try {
          await deleteFile(item.video.public_id);
        } catch (err) {
          console.error("Failed to delete old video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/video-slider"
      );
      item.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Upload new thumbnail
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/video-slider"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Video Slider Media Uploaded",
        id,
        `Media uploaded for video slider "${item.title}".`,
        LOG_MODULE
      );
    }

    return saved.videoSlider.sort((a, b) => a.order - b.order);
  }

  // ─────────────────────────────────────────────
  //  REELS
  // ─────────────────────────────────────────────

  /**
   * Get all Reels sorted by order
   */
  async getReels() {
    return await homepageRepository.getReels();
  }

  /**
   * Get a single Reel by ID
   */
  async getReelById(id) {
    return await homepageRepository.getReelById(id);
  }

  /**
   * Add a new Reel with optional video and thumbnail uploads.
   * Automatically assigns the next available order if not specified.
   * Prevents duplicate order values by shifting existing items down.
   */
  async addReel(data, files, admin) {
    const settings = await homepageRepository.getSettings();

    // Determine order — default to end of list; guard against duplicates
    let order =
      data.order !== undefined
        ? Number(data.order)
        : settings.reels.length + 1;

    // If duplicate order found, push all subsequent items down by 1
    const hasDuplicate = settings.reels.some((r) => r.order === order);
    if (hasDuplicate) {
      settings.reels.forEach((r) => {
        if (r.order >= order) r.order += 1;
      });
    }

    // Build the new Reel item
    const newItem = {
      title: data.title,
      description: data.description || "",
      order,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      reelVideo: { url: "", public_id: "", duration: 0, type: "video" },
      thumbnail: { url: "", public_id: "" },
    };

    // Upload reel video to Cloudinary if provided
    if (files?.video?.[0]) {
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/reels"
      );
      newItem.reelVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Upload thumbnail to Cloudinary if provided
    if (files?.thumbnail?.[0]) {
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/reels"
      );
      newItem.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    settings.reels.push(newItem);
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reel Created",
        saved._id,
        `Reel "${newItem.title}" created.`,
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Update an existing Reel item.
   * Deletes old Cloudinary media before uploading new files.
   * Prevents duplicate order values when order is changed.
   */
  async updateReel(id, data, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");

    // If order is changing, guard against duplicates
    if (data.order !== undefined) {
      const newOrder = Number(data.order);
      const hasDuplicate = settings.reels.some(
        (r) => r.order === newOrder && r._id.toString() !== id
      );
      if (hasDuplicate) {
        settings.reels.forEach((r) => {
          if (r._id.toString() !== id && r.order >= newOrder) r.order += 1;
        });
      }
      item.order = newOrder;
    }

    // Replace reel video: delete old from Cloudinary, upload new
    if (files?.video?.[0]) {
      if (item.reelVideo?.public_id) {
        try {
          await deleteFile(item.reelVideo.public_id);
        } catch (err) {
          console.error("Failed to delete old reel video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/reels"
      );
      item.reelVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Replace thumbnail: delete old from Cloudinary, upload new
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old reel thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/reels"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update text / meta fields
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.isActive !== undefined) item.isActive = Boolean(data.isActive);

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reel Updated",
        id,
        `Reel "${item.title}" updated.`,
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Delete a Reel and its associated Cloudinary media
   */
  async deleteReel(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");

    const title = item.title;

    // Delete reel video from Cloudinary
    if (item.reelVideo?.public_id) {
      try {
        await deleteFile(item.reelVideo.public_id);
      } catch (err) {
        console.error("Failed to delete reel video from Cloudinary:", err);
      }
    }

    // Delete thumbnail from Cloudinary
    if (item.thumbnail?.public_id) {
      try {
        await deleteFile(item.thumbnail.public_id);
      } catch (err) {
        console.error("Failed to delete reel thumbnail from Cloudinary:", err);
      }
    }

    // Remove item from array
    settings.reels = settings.reels.filter(
      (r) => r._id.toString() !== id
    );
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reel Deleted",
        id,
        `Reel "${title}" deleted.`,
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle isActive status of a Reel item
   */
  async toggleReel(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");

    item.isActive = !item.isActive;
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reel Toggled",
        id,
        `Reel "${item.title}" visibility changed to ${
          item.isActive ? "Active" : "Inactive"
        }.`,
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Reorder Reels by supplying an array of { id, order } pairs.
   * Validates that no duplicate order values are supplied.
   */
  async reorderReels(items, admin) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Reorder items must be a non-empty array");
    }

    // Guard against duplicate order values in the payload
    const orders = items.map((i) => Number(i.order));
    const uniqueOrders = new Set(orders);
    if (uniqueOrders.size !== orders.length) {
      throw new Error("Duplicate order values are not allowed in reorder payload");
    }

    const settings = await homepageRepository.getSettings();

    items.forEach(({ id, order }) => {
      const item = settings.reels.id(id);
      if (item) item.order = Number(order);
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reels Reordered",
        saved._id,
        "Reels reordered.",
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload reel video and/or thumbnail for an existing Reel item.
   * Deletes old Cloudinary files before uploading new ones.
   */
  async uploadReelMedia(id, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");

    // Upload new reel video
    if (files?.video?.[0]) {
      if (item.reelVideo?.public_id) {
        try {
          await deleteFile(item.reelVideo.public_id);
        } catch (err) {
          console.error("Failed to delete old reel video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/reels"
      );
      item.reelVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Upload new thumbnail
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old reel thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/reels"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Reel Media Uploaded",
        id,
        `Media uploaded for reel "${item.title}".`,
        LOG_MODULE
      );
    }

    return saved.reels.sort((a, b) => a.order - b.order);
  }

  // ─────────────────────────────────────────────
  //  SHORTS
  // ─────────────────────────────────────────────

  /**
   * Get all Shorts sorted by order
   */
  async getShorts() {
    return await homepageRepository.getShorts();
  }

  /**
   * Get a single Short by ID
   */
  async getShortById(id) {
    return await homepageRepository.getShortById(id);
  }

  /**
   * Add a new Short with optional video and thumbnail uploads.
   * Automatically assigns the next available order if not specified.
   * Prevents duplicate order values by shifting existing items.
   */
  async addShort(data, files, admin) {
    const settings = await homepageRepository.getSettings();

    // Determine order — default to end of list; guard against duplicates
    let order =
      data.order !== undefined
        ? Number(data.order)
        : settings.shorts.length + 1;

    // If duplicate order found, push all subsequent items down by 1
    const hasDuplicate = settings.shorts.some((s) => s.order === order);
    if (hasDuplicate) {
      settings.shorts.forEach((s) => {
        if (s.order >= order) s.order += 1;
      });
    }

    // Build the new Short item
    const newItem = {
      title: data.title,
      description: data.description || "",
      order,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      shortVideo: { url: "", public_id: "", duration: 0, type: "video" },
      thumbnail: { url: "", public_id: "" },
    };

    // Upload short video to Cloudinary if provided
    if (files?.video?.[0]) {
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/shorts"
      );
      newItem.shortVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Upload thumbnail to Cloudinary if provided
    if (files?.thumbnail?.[0]) {
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/shorts"
      );
      newItem.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    settings.shorts.push(newItem);
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Short Created",
        saved._id,
        `Short "${newItem.title}" created.`,
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Update an existing Short item.
   * Deletes old Cloudinary media before uploading new files.
   * Prevents duplicate order values when order is changed.
   */
  async updateShort(id, data, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");

    // If order is changing, guard against duplicates
    if (data.order !== undefined) {
      const newOrder = Number(data.order);
      const hasDuplicate = settings.shorts.some(
        (s) => s.order === newOrder && s._id.toString() !== id
      );
      if (hasDuplicate) {
        settings.shorts.forEach((s) => {
          if (s._id.toString() !== id && s.order >= newOrder) s.order += 1;
        });
      }
      item.order = newOrder;
    }

    // Replace short video: delete old from Cloudinary, upload new
    if (files?.video?.[0]) {
      if (item.shortVideo?.public_id) {
        try {
          await deleteFile(item.shortVideo.public_id);
        } catch (err) {
          console.error("Failed to delete old short video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/shorts"
      );
      item.shortVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Replace thumbnail: delete old from Cloudinary, upload new
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/shorts"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update text / meta fields
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.isActive !== undefined) item.isActive = Boolean(data.isActive);

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Short Updated",
        id,
        `Short "${item.title}" updated.`,
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Delete a Short and its associated Cloudinary media
   */
  async deleteShort(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");

    const title = item.title;

    // Delete short video from Cloudinary
    if (item.shortVideo?.public_id) {
      try {
        await deleteFile(item.shortVideo.public_id);
      } catch (err) {
        console.error("Failed to delete short video from Cloudinary:", err);
      }
    }

    // Delete thumbnail from Cloudinary
    if (item.thumbnail?.public_id) {
      try {
        await deleteFile(item.thumbnail.public_id);
      } catch (err) {
        console.error("Failed to delete short thumbnail from Cloudinary:", err);
      }
    }

    // Remove item from array
    settings.shorts = settings.shorts.filter(
      (s) => s._id.toString() !== id
    );
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Short Deleted",
        id,
        `Short "${title}" deleted.`,
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle isActive status of a Short item
   */
  async toggleShort(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");

    item.isActive = !item.isActive;
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Short Toggled",
        id,
        `Short "${item.title}" visibility changed to ${
          item.isActive ? "Active" : "Inactive"
        }.`,
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Reorder Shorts by supplying an array of { id, order } pairs.
   * Validates that no duplicate order values are supplied.
   */
  async reorderShorts(items, admin) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Reorder items must be a non-empty array");
    }

    // Guard against duplicate order values in the payload
    const orders = items.map((i) => Number(i.order));
    const uniqueOrders = new Set(orders);
    if (uniqueOrders.size !== orders.length) {
      throw new Error("Duplicate order values are not allowed in reorder payload");
    }

    const settings = await homepageRepository.getSettings();

    items.forEach(({ id, order }) => {
      const item = settings.shorts.id(id);
      if (item) item.order = Number(order);
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Shorts Reordered",
        saved._id,
        "Shorts reordered.",
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload short video and/or thumbnail for an existing Short item.
   * Deletes old Cloudinary files before uploading new ones.
   */
  async uploadShortMedia(id, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");

    // Upload new short video
    if (files?.video?.[0]) {
      if (item.shortVideo?.public_id) {
        try {
          await deleteFile(item.shortVideo.public_id);
        } catch (err) {
          console.error("Failed to delete old short video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/shorts"
      );
      item.shortVideo = {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration || 0,
        type: "video",
      };
    }

    // Upload new thumbnail
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old short thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/shorts"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Short Media Uploaded",
        id,
        `Media uploaded for short "${item.title}".`,
        LOG_MODULE
      );
    }

    return saved.shorts.sort((a, b) => a.order - b.order);
  }

  // ─────────────────────────────────────────────
  //  LONG VIDEOS
  // ─────────────────────────────────────────────

  /**
   * Get all Long Videos sorted by order
   */
  async getLongVideos() {
    return await homepageRepository.getLongVideos();
  }

  /**
   * Get a single Long Video by subdocument ID
   */
  async getLongVideoById(id) {
    return await homepageRepository.getLongVideoById(id);
  }

  /**
   * Add a new Long Video with optional video and thumbnail uploads.
   * Automatically assigns the next available order if not specified.
   * Prevents duplicate order values by shifting existing items down.
   */
  async addLongVideo(data, files, admin) {
    const settings = await homepageRepository.getSettings();

    // Determine order — default to end of list; guard against duplicates
    let order =
      data.order !== undefined
        ? Number(data.order)
        : settings.longVideos.length + 1;

    // If duplicate order found, push all subsequent items down by 1
    const hasDuplicate = settings.longVideos.some((v) => v.order === order);
    if (hasDuplicate) {
      settings.longVideos.forEach((v) => {
        if (v.order >= order) v.order += 1;
      });
    }

    // Build the new Long Video item
    const newItem = {
      title: data.title,
      subtitle: data.subtitle || "",
      description: data.description || "",
      category: data.category || "",
      duration: data.duration !== undefined ? Number(data.duration) : 0,
      order,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      video: { url: "", public_id: "", type: "video" },
      thumbnail: { url: "", public_id: "" },
    };

    // Upload long video to Cloudinary if provided
    if (files?.video?.[0]) {
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/long-videos"
      );
      newItem.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Upload thumbnail to Cloudinary if provided
    if (files?.thumbnail?.[0]) {
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/long-videos"
      );
      newItem.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    settings.longVideos.push(newItem);
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Video Created",
        saved._id,
        `Long video "${newItem.title}" created.`,
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Update an existing Long Video item.
   * Deletes old Cloudinary media before uploading new files.
   * Prevents duplicate order values when order is changed.
   */
  async updateLongVideo(id, data, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");

    // If order is changing, guard against duplicates
    if (data.order !== undefined) {
      const newOrder = Number(data.order);
      const hasDuplicate = settings.longVideos.some(
        (v) => v.order === newOrder && v._id.toString() !== id
      );
      if (hasDuplicate) {
        settings.longVideos.forEach((v) => {
          if (v._id.toString() !== id && v.order >= newOrder) v.order += 1;
        });
      }
      item.order = newOrder;
    }

    // Replace long video: delete old from Cloudinary, upload new
    if (files?.video?.[0]) {
      if (item.video?.public_id) {
        try {
          await deleteFile(item.video.public_id);
        } catch (err) {
          console.error("Failed to delete old long video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/long-videos"
      );
      item.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Replace thumbnail: delete old from Cloudinary, upload new
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old long video thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/long-videos"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update text / meta fields
    if (data.title !== undefined) item.title = data.title;
    if (data.subtitle !== undefined) item.subtitle = data.subtitle;
    if (data.description !== undefined) item.description = data.description;
    if (data.category !== undefined) item.category = data.category;
    if (data.duration !== undefined) item.duration = Number(data.duration);
    if (data.isActive !== undefined) item.isActive = Boolean(data.isActive);

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Video Updated",
        id,
        `Long video "${item.title}" updated.`,
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Delete a Long Video and its associated Cloudinary media
   */
  async deleteLongVideo(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");

    const title = item.title;

    // Delete long video from Cloudinary
    if (item.video?.public_id) {
      try {
        await deleteFile(item.video.public_id);
      } catch (err) {
        console.error("Failed to delete long video from Cloudinary:", err);
      }
    }

    // Delete thumbnail from Cloudinary
    if (item.thumbnail?.public_id) {
      try {
        await deleteFile(item.thumbnail.public_id);
      } catch (err) {
        console.error("Failed to delete long video thumbnail from Cloudinary:", err);
      }
    }

    // Remove item from array
    settings.longVideos = settings.longVideos.filter(
      (v) => v._id.toString() !== id
    );
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Video Deleted",
        id,
        `Long video "${title}" deleted.`,
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle isActive status of a Long Video item
   */
  async toggleLongVideo(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");

    item.isActive = !item.isActive;
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Video Toggled",
        id,
        `Long video "${item.title}" visibility changed to ${
          item.isActive ? "Active" : "Inactive"
        }.`,
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Reorder Long Videos by supplying an array of { id, order } pairs.
   * Validates that no duplicate order values are supplied.
   */
  async reorderLongVideos(items, admin) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Reorder items must be a non-empty array");
    }

    // Guard against duplicate order values in the payload
    const orders = items.map((i) => Number(i.order));
    const uniqueOrders = new Set(orders);
    if (uniqueOrders.size !== orders.length) {
      throw new Error("Duplicate order values are not allowed in reorder payload");
    }

    const settings = await homepageRepository.getSettings();

    items.forEach(({ id, order }) => {
      const item = settings.longVideos.id(id);
      if (item) item.order = Number(order);
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Videos Reordered",
        saved._id,
        "Long videos reordered.",
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload long video and/or thumbnail for an existing Long Video item.
   * Deletes old Cloudinary files before uploading new ones.
   */
  async uploadLongVideoMedia(id, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");

    // Upload new long video
    if (files?.video?.[0]) {
      if (item.video?.public_id) {
        try {
          await deleteFile(item.video.public_id);
        } catch (err) {
          console.error("Failed to delete old long video from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.video[0],
        "homepage/long-videos"
      );
      item.video = {
        url: result.secure_url,
        public_id: result.public_id,
        type: "video",
      };
    }

    // Upload new thumbnail
    if (files?.thumbnail?.[0]) {
      if (item.thumbnail?.public_id) {
        try {
          await deleteFile(item.thumbnail.public_id);
        } catch (err) {
          console.error("Failed to delete old long video thumbnail from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.thumbnail[0],
        "homepage/long-videos"
      );
      item.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Long Video Media Uploaded",
        id,
        `Media uploaded for long video "${item.title}".`,
        LOG_MODULE
      );
    }

    return saved.longVideos.sort((a, b) => a.order - b.order);
  }

  // ─────────────────────────────────────────────
  //  HERO SLIDER
  // ─────────────────────────────────────────────

  /**
   * Get all Hero Sliders sorted by order
   */
  async getHeroSliders() {
    return await homepageRepository.getHeroSliders();
  }

  /**
   * Get a single Hero Slider by ID
   */
  async getHeroSliderById(id) {
    return await homepageRepository.getHeroSliderById(id);
  }

  /**
   * Add a new Hero Slider with optional media upload
   */
  async addHeroSlider(data, files, admin) {
    const settings = await homepageRepository.getSettings();

    // Determine order — default to end of list; guard against duplicates
    let order =
      data.order !== undefined
        ? Number(data.order)
        : settings.heroSlider.length + 1;

    // If duplicate order found, push all subsequent items down by 1
    const hasDuplicate = settings.heroSlider.some((s) => s.order === order);
    if (hasDuplicate) {
      settings.heroSlider.forEach((s) => {
        if (s.order >= order) s.order += 1;
      });
    }

    // Build the new Hero Slider item
    const newItem = {
      title: data.title || "",
      subtitle: data.subtitle || "",
      description: data.description || "",
      button: {
        label: data.button?.label || "",
        link: data.button?.link || "",
      },
      overlay: {
        enabled: data.overlay?.enabled ? Boolean(data.overlay.enabled) : false,
        color: data.overlay?.color || "",
        opacity: data.overlay?.opacity ? Number(data.overlay.opacity) : 0,
      },
      textPosition: data.textPosition || "",
      alignment: data.alignment || "",
      order,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      media: { url: "", public_id: "", type: "image" },
      mobileMedia: { url: "", public_id: "", type: "image" },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Upload media to Cloudinary if provided
    if (files?.media?.[0]) {
      const result = await this._uploadToCloudinary(
        files.media[0],
        "homepage/hero-slider"
      );
      newItem.media = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
    }

    if (files?.mobileMedia?.[0]) {
      const result = await this._uploadToCloudinary(
        files.mobileMedia[0],
        "homepage/hero-slider"
      );
      newItem.mobileMedia = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
    }

    settings.heroSlider.push(newItem);
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Slider Created",
        saved._id,
        `Hero slider "${newItem.title}" created.`,
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Update an existing Hero Slider item.
   * Deletes old Cloudinary media before uploading new files.
   * Prevents duplicate order values when order is changed.
   */
  async updateHeroSlider(id, data, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");

    // If order is changing, guard against duplicates
    if (data.order !== undefined) {
      const newOrder = Number(data.order);
      const hasDuplicate = settings.heroSlider.some(
        (s) => s.order === newOrder && s._id.toString() !== id
      );
      if (hasDuplicate) {
        settings.heroSlider.forEach((s) => {
          if (s._id.toString() !== id && s.order >= newOrder) s.order += 1;
        });
      }
      item.order = newOrder;
    }

    // Replace media: delete old from Cloudinary, upload new
    if (files?.media?.[0]) {
      if (item.media?.public_id) {
        try {
          await deleteFile(item.media.public_id);
        } catch (err) {
          console.error("Failed to delete old hero slider media from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.media[0],
        "homepage/hero-slider"
      );
      item.media = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
    }

    // Replace mobileMedia: delete old from Cloudinary, upload new
    if (files?.mobileMedia?.[0]) {
      if (item.mobileMedia?.public_id) {
        try {
          await deleteFile(item.mobileMedia.public_id);
        } catch (err) {
          console.error("Failed to delete old hero slider mobile media from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.mobileMedia[0],
        "homepage/hero-slider"
      );
      item.mobileMedia = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
    }

    // Update text / meta fields
    if (data.title !== undefined) item.title = data.title;
    if (data.subtitle !== undefined) item.subtitle = data.subtitle;
    if (data.description !== undefined) item.description = data.description;
    
    if (data.button !== undefined) {
      if (data.button.label !== undefined) item.button.label = data.button.label;
      if (data.button.link !== undefined) item.button.link = data.button.link;
    }

    if (data.overlay !== undefined) {
      if (data.overlay.enabled !== undefined) item.overlay.enabled = Boolean(data.overlay.enabled);
      if (data.overlay.color !== undefined) item.overlay.color = data.overlay.color;
      if (data.overlay.opacity !== undefined) item.overlay.opacity = Number(data.overlay.opacity);
    }

    if (data.textPosition !== undefined) item.textPosition = data.textPosition;
    if (data.alignment !== undefined) item.alignment = data.alignment;
    if (data.isActive !== undefined) item.isActive = Boolean(data.isActive);
    item.updatedAt = new Date();

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Slider Updated",
        id,
        `Hero slider "${item.title}" updated.`,
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Delete a Hero Slider and its associated Cloudinary media
   */
  async deleteHeroSlider(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");

    const title = item.title;

    // Delete media from Cloudinary
    if (item.media?.public_id) {
      try {
        await deleteFile(item.media.public_id);
      } catch (err) {
        console.error("Failed to delete hero slider media from Cloudinary:", err);
      }
    }

    if (item.mobileMedia?.public_id) {
      try {
        await deleteFile(item.mobileMedia.public_id);
      } catch (err) {
        console.error("Failed to delete hero slider mobile media from Cloudinary:", err);
      }
    }

    // Remove item from array
    settings.heroSlider = settings.heroSlider.filter(
      (s) => s._id.toString() !== id
    );

    // Reorder remaining slides sequentially
    settings.heroSlider.sort((a, b) => a.order - b.order);
    settings.heroSlider.forEach((s, index) => {
      s.order = index + 1;
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Slider Deleted",
        id,
        `Hero slider "${title}" deleted.`,
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Toggle isActive status of a Hero Slider item
   */
  async toggleHeroSlider(id, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");

    item.isActive = !item.isActive;
    item.updatedAt = new Date();
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Slider Toggled",
        id,
        `Hero slider "${item.title}" visibility changed to ${
          item.isActive ? "Active" : "Inactive"
        }.`,
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Reorder Hero Sliders by supplying an array of { id, order } pairs.
   * Validates that no duplicate order values are supplied.
   */
  async reorderHeroSliders(items, admin) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Reorder items must be a non-empty array");
    }

    // Guard against duplicate order values in the payload
    const orders = items.map((i) => Number(i.order));
    const uniqueOrders = new Set(orders);
    if (uniqueOrders.size !== orders.length) {
      throw new Error("Duplicate order values are not allowed in reorder payload");
    }

    const settings = await homepageRepository.getSettings();

    items.forEach(({ id, order }) => {
      const item = settings.heroSlider.id(id);
      if (item) {
        item.order = Number(order);
        item.updatedAt = new Date();
      }
    });

    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Sliders Reordered",
        saved._id,
        "Hero sliders reordered.",
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Upload media for an existing Hero Slider.
   * Deletes old Cloudinary files before uploading new ones.
   */
  async uploadHeroSliderMedia(id, files, admin) {
    const settings = await homepageRepository.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");

    let newMediaUploaded = false;

    if (files?.media?.[0]) {
      if (item.media?.public_id) {
        try {
          await deleteFile(item.media.public_id);
        } catch (err) {
          console.error("Failed to delete old hero slider media from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.media[0],
        "homepage/hero-slider"
      );
      item.media = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
      newMediaUploaded = true;
    }

    if (files?.mobileMedia?.[0]) {
      if (item.mobileMedia?.public_id) {
        try {
          await deleteFile(item.mobileMedia.public_id);
        } catch (err) {
          console.error("Failed to delete old hero slider mobile media from Cloudinary:", err);
        }
      }
      const result = await this._uploadToCloudinary(
        files.mobileMedia[0],
        "homepage/hero-slider"
      );
      item.mobileMedia = {
        url: result.secure_url,
        public_id: result.public_id,
        type: result.resource_type === "video" ? "video" : "image",
      };
      newMediaUploaded = true;
    }

    if (!newMediaUploaded) {
      throw new Error("No media file provided");
    }

    item.updatedAt = new Date();
    const saved = await homepageRepository.save(settings);

    if (admin) {
      await activityLogService.logAction(
        admin.id,
        "Hero Slider Media Uploaded",
        id,
        `Media uploaded for hero slider "${item.title}".`,
        LOG_MODULE
      );
    }

    return saved.heroSlider.sort((a, b) => a.order - b.order);
  }
}

export default new HomepageService();
