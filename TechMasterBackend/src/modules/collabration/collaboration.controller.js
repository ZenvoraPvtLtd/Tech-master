import collaborationService from "./collaboration.service.js";
import { COLLABORATION_MESSAGES } from "../../constants/message.js";

class CollaborationController {

  // ===========================
  // Create Collaboration
  // ===========================

  async create(req, res, next) {
    try {
      const data = await collaborationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Get Collaboration
  // ===========================

  async get(req, res, next) {
    try {
      const data = await collaborationService.get();

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Hero
  // ===========================

  async updateHero(req, res, next) {
    try {
      const data = await collaborationService.updateHero(req.body);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.HERO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update History
  // ===========================

  async updateHistory(req, res, next) {
    try {
      const data = await collaborationService.updateHistory(req.body);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.HISTORY_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update SEO
  // ===========================

  async updateSeo(req, res, next) {
    try {
      const data = await collaborationService.updateSeo(req.body);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.SEO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Add Brand
  // ===========================

  async addBrand(req, res, next) {
    try {
      const data = await collaborationService.addBrand(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.BRAND_CAROUSEL_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Brand
  // ===========================

  async updateBrand(req, res, next) {
    try {
      const data = await collaborationService.updateBrand(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.BRAND_CAROUSEL_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Brand
  // ===========================

  async deleteBrand(req, res, next) {
    try {
      const data = await collaborationService.deleteBrand(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.BRAND_CAROUSEL_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Add Partner
  // ===========================

  async addPartner(req, res, next) {
    try {
      const data = await collaborationService.addPartner(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.PARTNERS_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Partner
  // ===========================

  async updatePartner(req, res, next) {
    try {
      const data = await collaborationService.updatePartner(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.PARTNERS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Partner
  // ===========================

  async deletePartner(req, res, next) {
    try {
      const data = await collaborationService.deletePartner(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.PARTNERS_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Add Metric
  // ===========================

  async addMetric(req, res, next) {
    try {
      const data = await collaborationService.addMetric(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.METRICS_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Metric
  // ===========================

  async updateMetric(req, res, next) {
    try {
      const data = await collaborationService.updateMetric(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.METRICS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Metric
  // ===========================

  async deleteMetric(req, res, next) {
    try {
      const data = await collaborationService.deleteMetric(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.METRICS_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Add Campaign
  // ===========================

  async addCampaign(req, res, next) {
    try {
      const data = await collaborationService.addCampaign(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.CAMPAIGNS_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Campaign
  // ===========================

  async updateCampaign(req, res, next) {
    try {
      const data = await collaborationService.updateCampaign(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.CAMPAIGNS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Campaign
  // ===========================

  async deleteCampaign(req, res, next) {
    try {
      const data = await collaborationService.deleteCampaign(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.CAMPAIGNS_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  // ===========================
  // Add Process
  // ===========================

  async addProcess(req, res, next) {
    try {
      const data = await collaborationService.addProcess(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.PROCESSES_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Process
  // ===========================

  async updateProcess(req, res, next) {
    try {
      const data = await collaborationService.updateProcess(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.PROCESS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Process
  // ===========================

  async deleteProcess(req, res, next) {
    try {
      const data = await collaborationService.deleteProcess(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.PROCESS_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Add Testimonial
  // ===========================

  async addTestimonial(req, res, next) {
    try {
      const data = await collaborationService.addTestimonial(req.body);

      return res.status(201).json({
        success: true,
        message: COLLABORATION_MESSAGES.TESTIMONIALS_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Testimonial
  // ===========================

  async updateTestimonial(req, res, next) {
    try {
      const data = await collaborationService.updateTestimonial(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.TESTIMONIALS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Testimonial
  // ===========================

  async deleteTestimonial(req, res, next) {
    try {
      const data = await collaborationService.deleteTestimonial(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.TESTIMONIALS_DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Update Section Settings
  // ===========================

  async updateSectionSettings(req, res, next) {
    try {
      const data = await collaborationService.updateSectionSettings(req.body);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.SECTION_SETTINGS_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================
  // Delete Collaboration
  // ===========================

  async delete(req, res, next) {
    try {
      const data = await collaborationService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: COLLABORATION_MESSAGES.DELETED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CollaborationController();