import aboutService from "./about.service.js";
import MESSAGES from "../../constants/message.js";


class AboutController {

  /**
   * Get About CMS
   */
  async getAbout(req, res, next) {
    try {
      const about = await aboutService.getAbout();

      return res.status(200).json({
        success: true,
        message: MESSAGES.FETCHED,
        data: about,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Introduction
   */
  async updateIntroduction(req, res, next) {
    try {

      const result = await aboutService.updateIntroduction(
        req.body,
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Introduction updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Story
   */
  async updateStory(req, res, next) {
    try {

      const result = await aboutService.updateStory(
        req.body,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Story updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Upload Story Image
   */
  async uploadStoryImage(req, res, next) {
    try {

      const result = await aboutService.uploadStoryImage(
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Story image uploaded successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Upload Story Video
   */
  async uploadStoryVideo(req, res, next) {
    try {

      const result = await aboutService.uploadStoryVideo(
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Story video uploaded successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }
/**
   * Delete Story Image
   */
  async deleteStoryImage(req, res, next) {
    try {
      const result = await aboutService.deleteStoryImage(
        req.params.imageId,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Story image deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete Story Video
   */
  async deleteStoryVideo(req, res, next) {
    try {
      const result = await aboutService.deleteStoryVideo(
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Story video deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Vision
   */
  async updateVision(req, res, next) {
    try {
      const result = await aboutService.updateVision(
        req.body,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Vision updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Upload Vision Image
   */
  async uploadVisionImage(req, res, next) {
    try {
      const result = await aboutService.uploadVisionImage(
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Vision image uploaded successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete Vision Image
   */
  async deleteVisionImage(req, res, next) {
    try {
      const result = await aboutService.deleteVisionImage(
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Vision image deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Highlights
   */
  async updateHighlights(req, res, next) {
    try {
      const result = await aboutService.updateHighlights(
        req.body.highlights,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Highlights updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Reorder Highlights
   */
  async reorderHighlights(req, res, next) {
    try {
      const result = await aboutService.reorderHighlights(
        req.body.highlights,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Highlights reordered successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }
  /**
   * Add Achievement
   */
  async addAchievement(req, res, next) {
    try {
      const result = await aboutService.addAchievement(
        req.body,
        req.file,
        req.user.id
      );

      return res.status(201).json({
        success: true,
        message: "Achievement added successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Achievement
   */
  async updateAchievement(req, res, next) {
    try {
      const result = await aboutService.updateAchievement(
        req.params.id,
        req.body,
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Achievement updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete Achievement
   */
  async deleteAchievement(req, res, next) {
    try {
      const result = await aboutService.deleteAchievement(
        req.params.id,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Achievement deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Add Award
   */
  async addAward(req, res, next) {
    try {
      const result = await aboutService.addAward(
        req.body,
        req.file,
        req.user.id
      );

      return res.status(201).json({
        success: true,
        message: "Award added successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Award
   */
  async updateAward(req, res, next) {
    try {
      const result = await aboutService.updateAward(
        req.params.id,
        req.body,
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Award updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete Award
   */
  async deleteAward(req, res, next) {
    try {
      const result = await aboutService.deleteAward(
        req.params.id,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Award deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }
  /**
   * Add Experience
   */
  async addExperience(req, res, next) {
    try {
      const result = await aboutService.addExperience(
        req.body,
        req.file,
        req.user.id
      );

      return res.status(201).json({
        success: true,
        message: "Experience added successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Experience
   */
  async updateExperience(req, res, next) {
    try {
      const result = await aboutService.updateExperience(
        req.params.id,
        req.body,
        req.file,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Experience updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete Experience
   */
  async deleteExperience(req, res, next) {
    try {
      const result = await aboutService.deleteExperience(
        req.params.id,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Experience deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update SEO
   */
  async updateSeo(req, res, next) {
    try {
      const result = await aboutService.updateSeo(
        req.body,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "SEO updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Section Status
   */
  async updateSectionStatus(req, res, next) {
    try {
      const result = await aboutService.updateSectionStatus(
        req.params.section,
        req.body.enabled,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Section status updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Reorder Sections
   */
  async reorderSections(req, res, next) {
    try {
      const result = await aboutService.reorderSections(
        req.body.sections,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Sections reordered successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Update Publish Status
   */
  async updatePublishStatus(req, res, next) {
    try {
      const result = await aboutService.updatePublishStatus(
        req.body.status,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Publish status updated successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }


  /**
   * Delete About
   */
  async deleteAbout(req, res, next) {
    try {
      const result = await aboutService.deleteAbout(
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "About data deleted successfully",
        data: result,
      });

    } catch (error) {
      next(error);
    }
  }

}
export default new AboutController();
