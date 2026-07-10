import homepageService from "./homepage.service.js";
import MESSAGES from "../../constants/message.js";

class HomepageController {
  /**
   * Fetch current page-level layout settings
   */
  async getSettings(req, res, next) {
    try {
      const settings = await homepageService.getSettings();

      return res.status(200).json({
        success: true,
        message: MESSAGES.FETCHED,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update page settings & Hero section content
   */
  async updateSettings(req, res, next) {
    try {
      const settings = await homepageService.updateSettings(req.body, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_UPDATED,
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
      const settings = await homepageService.publishLive(req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_PUBLISHED,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add Section
   */
  async addSection(req, res, next) {
    try {
      const settings = await homepageService.addSection(req.body, req.admin);

      return res.status(201).json({
        success: true,
        message: MESSAGES.HOMEPAGE_SECTION_CREATED,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Section
   */
  async deleteSection(req, res, next) {
    try {
      const { type } = req.params;
      const settings = await homepageService.deleteSection(type, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_SECTION_DELETED,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reorder items (Move chronological sequence indices)
   */
  async reorderSections(req, res, next) {
    try {
      const { type, direction } = req.body;
      const updatedSections = await homepageService.reorderSections(type, direction, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_SECTION_REORDERED,
        data: updatedSections,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Toggle section visibility (Active/Inactive status)
   */
  async toggleSectionStatus(req, res, next) {
    try {
      const { type } = req.params;
      const updatedSections = await homepageService.toggleSectionStatus(type, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_SECTION_TOGGLED,
        data: updatedSections,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload media for a hero section
   */
  async uploadMedia(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image/video file provided",
        });
      }

      const updatedSettings = await homepageService.uploadMedia(req.file, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_MEDIA_UPLOADED,
        data: updatedSettings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Homepage Preview
   */
  async getPreview(req, res, next) {
    try {
      const previewData = await homepageService.getPreviewOrPublic();

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_PREVIEW_FETCHED,
        data: previewData,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reset Homepage
   */
  async resetHomepage(req, res, next) {
    try {
      const settings = await homepageService.resetHomepage(req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_RESET,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Homepage Activity Logs
   */
  async getLogs(req, res, next) {
    try {
      const logs = await homepageService.getLogs();

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_LOGS_FETCHED,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Public Homepage API
   */
  async getPublic(req, res, next) {
    try {
      const publicData = await homepageService.getPreviewOrPublic();

      return res.status(200).json({
        success: true,
        message: MESSAGES.HOMEPAGE_PUBLIC_FETCHED,
        data: publicData,
      });
    } catch (error) {
      next(error);
    }
  }

  // ─────────────────────────────────────────────
  //  VIDEO SLIDER
  // ─────────────────────────────────────────────

  /**
   * GET /video-slider — Fetch all video sliders
   */
  async getVideoSliders(req, res, next) {
    try {
      const items = await homepageService.getVideoSliders();

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_FETCHED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /video-slider/:id — Fetch a single video slider by ID
   */
  async getVideoSliderById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await homepageService.getVideoSliderById(id);

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_FETCHED,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /video-slider — Create a new video slider
   */
  async addVideoSlider(req, res, next) {
    try {
      const items = await homepageService.addVideoSlider(
        req.body,
        req.files,
        req.admin
      );

      return res.status(201).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_CREATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /video-slider/:id — Update an existing video slider
   */
  async updateVideoSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.updateVideoSlider(
        id,
        req.body,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_UPDATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /video-slider/:id — Delete a video slider and its Cloudinary media
   */
  async deleteVideoSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.deleteVideoSlider(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_DELETED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /video-slider/:id/toggle — Toggle video slider visibility
   */
  async toggleVideoSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.toggleVideoSlider(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_TOGGLED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /video-slider/reorder — Reorder video sliders
   */
  async reorderVideoSlider(req, res, next) {
    try {
      const { items } = req.body;
      const reordered = await homepageService.reorderVideoSlider(
        items,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_REORDERED,
        data: reordered,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /video-slider/upload — Upload video and/or thumbnail for an existing item.
   * Pass the target slider's `id` in the request body alongside the file fields.
   */
  async uploadVideoSliderMedia(req, res, next) {
    try {
      if (!req.files || (!req.files.video && !req.files.thumbnail)) {
        return res.status(400).json({
          success: false,
          message: "No video or thumbnail file provided",
        });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Video slider ID is required",
        });
      }

      const items = await homepageService.uploadVideoSliderMedia(
        id,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.VIDEO_SLIDER_MEDIA_UPLOADED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  // ─────────────────────────────────────────────
  //  REELS
  // ─────────────────────────────────────────────

  /**
   * GET /reels — Fetch all reels sorted by order
   */
  async getReels(req, res, next) {
    try {
      const items = await homepageService.getReels();

      return res.status(200).json({
        success: true,
        message: MESSAGES.REELS_FETCHED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /reels/:id — Fetch a single reel by ID
   */
  async getReelById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await homepageService.getReelById(id);

      return res.status(200).json({
        success: true,
        message: MESSAGES.REEL_FETCHED,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /reels — Create a new reel with optional video + thumbnail upload
   */
  async addReel(req, res, next) {
    try {
      const items = await homepageService.addReel(
        req.body,
        req.files,
        req.admin
      );

      return res.status(201).json({
        success: true,
        message: MESSAGES.REEL_CREATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /reels/:id — Update an existing reel
   */
  async updateReel(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.updateReel(
        id,
        req.body,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.REEL_UPDATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /reels/:id — Delete a reel and its Cloudinary media
   */
  async deleteReel(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.deleteReel(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.REEL_DELETED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /reels/:id/toggle — Toggle reel visibility
   */
  async toggleReel(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.toggleReel(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.REEL_TOGGLED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /reels/reorder — Reorder reels
   */
  async reorderReels(req, res, next) {
    try {
      const { items } = req.body;
      const reordered = await homepageService.reorderReels(
        items,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.REELS_REORDERED,
        data: reordered,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /reels/upload — Upload reel video and/or thumbnail for an existing reel.
   * Pass the target reel's `id` in the request body alongside the file fields.
   */
  async uploadReelMedia(req, res, next) {
    try {
      if (!req.files || (!req.files.video && !req.files.thumbnail)) {
        return res.status(400).json({
          success: false,
          message: "No video or thumbnail file provided",
        });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Reel ID is required",
        });
      }

      const items = await homepageService.uploadReelMedia(
        id,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.REEL_MEDIA_UPLOADED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  // ─────────────────────────────────────────────
  //  SHORTS
  // ─────────────────────────────────────────────

  /**
   * GET /shorts — Fetch all shorts sorted by order
   */
  async getShorts(req, res, next) {
    try {
      const items = await homepageService.getShorts();

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORTS_FETCHED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /shorts/:id — Fetch a single short by ID
   */
  async getShortById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await homepageService.getShortById(id);

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORT_FETCHED,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /shorts — Create a new short with optional video + thumbnail upload
   */
  async addShort(req, res, next) {
    try {
      const items = await homepageService.addShort(
        req.body,
        req.files,
        req.admin
      );

      return res.status(201).json({
        success: true,
        message: MESSAGES.SHORT_CREATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /shorts/:id — Update an existing short
   */
  async updateShort(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.updateShort(
        id,
        req.body,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORT_UPDATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /shorts/:id — Delete a short and its Cloudinary media
   */
  async deleteShort(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.deleteShort(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORT_DELETED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /shorts/:id/toggle — Toggle short visibility
   */
  async toggleShort(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.toggleShort(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORT_TOGGLED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /shorts/reorder — Reorder shorts
   */
  async reorderShorts(req, res, next) {
    try {
      const { items } = req.body;
      const reordered = await homepageService.reorderShorts(
        items,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORTS_REORDERED,
        data: reordered,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /shorts/upload — Upload short video and/or thumbnail for an existing item.
   * Pass the target short's `id` in the request body alongside the file fields.
   */
  async uploadShortMedia(req, res, next) {
    try {
      if (!req.files || (!req.files.video && !req.files.thumbnail)) {
        return res.status(400).json({
          success: false,
          message: "No video or thumbnail file provided",
        });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Short ID is required",
        });
      }

      const items = await homepageService.uploadShortMedia(
        id,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.SHORT_MEDIA_UPLOADED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
  // ─────────────────────────────────────────────
  //  LONG VIDEOS
  // ─────────────────────────────────────────────

  /**
   * GET /long-videos — Fetch all long videos sorted by order
   */
  async getLongVideos(req, res, next) {
    try {
      const items = await homepageService.getLongVideos();

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEOS_FETCHED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /long-videos/:id — Fetch a single long video by ID
   */
  async getLongVideoById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await homepageService.getLongVideoById(id);

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_FETCHED,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /long-videos — Create a new long video with optional file uploads
   */
  async addLongVideo(req, res, next) {
    try {
      const items = await homepageService.addLongVideo(
        req.body,
        req.files,
        req.admin
      );

      return res.status(201).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_CREATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /long-videos/:id — Update an existing long video
   */
  async updateLongVideo(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.updateLongVideo(
        id,
        req.body,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_UPDATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /long-videos/:id — Delete a long video and its Cloudinary media
   */
  async deleteLongVideo(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.deleteLongVideo(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_DELETED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /long-videos/:id/toggle — Toggle long video visibility
   */
  async toggleLongVideo(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.toggleLongVideo(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_TOGGLED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /long-videos/reorder — Reorder long videos
   */
  async reorderLongVideos(req, res, next) {
    try {
      const { items } = req.body;
      const reordered = await homepageService.reorderLongVideos(
        items,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEOS_REORDERED,
        data: reordered,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /long-videos/upload — Upload video and/or thumbnail for an existing long video.
   * Pass the target long video's `id` in the request body alongside the file fields.
   */
  async uploadLongVideoMedia(req, res, next) {
    try {
      if (!req.files || (!req.files.video && !req.files.thumbnail)) {
        return res.status(400).json({
          success: false,
          message: "No video or thumbnail file provided",
        });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Long video ID is required",
        });
      }

      const items = await homepageService.uploadLongVideoMedia(
        id,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.LONG_VIDEO_MEDIA_UPLOADED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  // ─────────────────────────────────────────────
  //  HERO SLIDER
  // ─────────────────────────────────────────────

  /**
   * GET /hero-slider — Fetch all hero sliders sorted by order
   */
  async getHeroSliders(req, res, next) {
    try {
      const items = await homepageService.getHeroSliders();

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDERS_FETCHED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /hero-slider/:id — Fetch single hero slider
   */
  async getHeroSliderById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await homepageService.getHeroSliderById(id);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_FETCHED,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /hero-slider — Create a new hero slider
   */
  async addHeroSlider(req, res, next) {
    try {
      const items = await homepageService.addHeroSlider(
        req.body,
        req.files,
        req.admin
      );

      return res.status(201).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_CREATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /hero-slider/:id — Update an existing hero slider
   */
  async updateHeroSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.updateHeroSlider(
        id,
        req.body,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_UPDATED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /hero-slider/:id — Delete a hero slider and its Cloudinary media
   */
  async deleteHeroSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.deleteHeroSlider(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_DELETED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /hero-slider/:id/toggle — Toggle hero slider visibility
   */
  async toggleHeroSlider(req, res, next) {
    try {
      const { id } = req.params;
      const items = await homepageService.toggleHeroSlider(id, req.admin);

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_TOGGLED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /hero-slider/reorder — Reorder hero sliders
   */
  async reorderHeroSliders(req, res, next) {
    try {
      const { items } = req.body;
      const reordered = await homepageService.reorderHeroSliders(
        items,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDERS_REORDERED,
        data: reordered,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /hero-slider/upload — Upload media and/or mobileMedia for an existing hero slider.
   * Pass the target hero slider's `id` in the request body alongside the file fields.
   */
  async uploadHeroSliderMedia(req, res, next) {
    try {
      if (!req.files || (!req.files.media && !req.files.mobileMedia)) {
        return res.status(400).json({
          success: false,
          message: "No media or mobileMedia file provided",
        });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Hero slider ID is required",
        });
      }

      const items = await homepageService.uploadHeroSliderMedia(
        id,
        req.files,
        req.admin
      );

      return res.status(200).json({
        success: true,
        message: MESSAGES.HERO_SLIDER_MEDIA_UPLOADED,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new HomepageController();
