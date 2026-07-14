import { campaignService, launchService } from "./campaigns.service.js";
import MESSAGES, { CAMPAIGN_MESSAGES } from "../../constants/message.js";

/* ==========================================================
   CAMPAIGN CONTROLLER
========================================================== */

class CampaignController {

  // ==========================
  // Hero
  // ==========================

  async getHero(req, res, next) {
    try {
      const data = await campaignService.getHero();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_HERO_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateHero(req, res, next) {
    try {
      const data = await campaignService.updateHero(req.body);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_HERO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // Campaign List
  // ==========================

  async getAllCampaigns(req, res, next) {
    try {
      const data = await campaignService.getAllCampaigns();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCampaignById(req, res, next) {
    try {
      const data = await campaignService.getCampaignById(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addCampaign(req, res, next) {
    try {
      const data = await campaignService.addCampaign(req.body);

      return res.status(201).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCampaign(req, res, next) {
    try {
      const data = await campaignService.updateCampaign(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCampaign(req, res, next) {
    try {
      await campaignService.deleteCampaign(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // Lifecycle
  // ==========================

  async getAllLifecycle(req, res, next) {
    try {
      const data = await campaignService.getAllLifecycle();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LIFECYCLE_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addLifecycle(req, res, next) {
    try {
      const data = await campaignService.addLifecycle(req.body);

      return res.status(201).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LIFECYCLE_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLifecycle(req, res, next) {
    try {
      const data = await campaignService.updateLifecycle(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LIFECYCLE_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLifecycle(req, res, next) {
    try {
      await campaignService.deleteLifecycle(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LIFECYCLE_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }
  // ==========================
  // Success Stories
  // ==========================

  async getAllSuccessStories(req, res, next) {
    try {
      const data = await campaignService.getAllSuccessStories();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.SUCCESS_STORY_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addSuccessStory(req, res, next) {
    try {
      const data = await campaignService.addSuccessStory(req.body);

      return res.status(201).json({
        success: true,
        message: CAMPAIGN_MESSAGES.SUCCESS_STORY_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSuccessStory(req, res, next) {
    try {
      const data = await campaignService.updateSuccessStory(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.SUCCESS_STORY_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSuccessStory(req, res, next) {
    try {
      await campaignService.deleteSuccessStory(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.SUCCESS_STORY_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // SEO
  // ==========================

  async getSeo(req, res, next) {
    try {
      const data = await campaignService.getSeo();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_SEO_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSeo(req, res, next) {
    try {
      const data = await campaignService.updateSeo(req.body);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.CAMPAIGN_SEO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

/* ==========================================================
   LAUNCH CONTROLLER
========================================================== */

class LaunchController {

  // ==========================
  // Hero
  // ==========================

  async getHero(req, res, next) {
    try {
      const data = await launchService.getHero();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LAUNCH_HERO_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateHero(req, res, next) {
    try {
      const data = await launchService.updateHero(req.body);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LAUNCH_HERO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // Products
  // ==========================

  async getAllProducts(req, res, next) {
    try {
      const data = await launchService.getAllProducts();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.PRODUCT_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const data = await launchService.getProductById(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.PRODUCT_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    try {
      const data = await launchService.addProduct(req.body);

      return res.status(201).json({
        success: true,
        message: CAMPAIGN_MESSAGES.PRODUCT_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const data = await launchService.updateProduct(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.PRODUCT_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await launchService.deleteProduct(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.PRODUCT_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }
  // ==========================
  // Feature Video
  // ==========================

  async getFeatureVideo(req, res, next) {
    try {
      const data = await launchService.getFeatureVideo();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.FEATURE_VIDEO_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateFeatureVideo(req, res, next) {
    try {
      const data = await launchService.updateFeatureVideo(req.body);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.FEATURE_VIDEO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // Initiatives
  // ==========================

  async getAllInitiatives(req, res, next) {
    try {
      const data = await launchService.getAllInitiatives();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.INITIATIVE_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addInitiative(req, res, next) {
    try {
      const data = await launchService.addInitiative(req.body);

      return res.status(201).json({
        success: true,
        message: CAMPAIGN_MESSAGES.INITIATIVE_CREATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInitiative(req, res, next) {
    try {
      const data = await launchService.updateInitiative(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.INITIATIVE_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInitiative(req, res, next) {
    try {
      await launchService.deleteInitiative(req.params.id);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.INITIATIVE_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================
  // Launch SEO
  // ==========================

  async getSeo(req, res, next) {
    try {
      const data = await launchService.getSeo();

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LAUNCH_SEO_FETCHED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSeo(req, res, next) {
    try {
      const data = await launchService.updateSeo(req.body);

      return res.status(200).json({
        success: true,
        message: CAMPAIGN_MESSAGES.LAUNCH_SEO_UPDATED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const campaignController = new CampaignController();
export const launchController = new LaunchController();