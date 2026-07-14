import whatWeDoService from "./whatWeDo.service.js";
import activityLogService from "../activityLog/activityLog.service.js";
import { WHAT_WE_DO_MESSAGES } from "../../constants/message.js";

class WhatWeDoController {

  async get(req, res, next) {
    try {
      const data = await whatWeDoService.get();
      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.FETCHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await whatWeDoService.create(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Created What We Do Page",
        data.id,
        WHAT_WE_DO_MESSAGES.CREATED,
        "What We Do"
      );

      res.status(201).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.CREATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Hero
  async updateHero(req, res, next) {
    try {
      const data = await whatWeDoService.updateHero(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated Hero Settings",
        null,
        WHAT_WE_DO_MESSAGES.HERO_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.HERO_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Operations
  async getAllOperations(req, res, next) {
    try {
      const pageDoc = await whatWeDoService.get();

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATIONS_FETCHED,
        data: pageDoc.operations
      });
    } catch (error) {
      next(error);
    }
  }

  async getOperationById(req, res, next) {
    try {
      const data = await whatWeDoService.getOperationById(req.params.id);

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATIONS_FETCHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async createOperation(req, res, next) {
    try {
      const data = await whatWeDoService.addOperation(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Created Operation",
        data.id,
        WHAT_WE_DO_MESSAGES.OPERATION_CREATED,
        "What We Do"
      );

      res.status(201).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATION_CREATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOperation(req, res, next) {
    try {
      const data = await whatWeDoService.updateOperation(req.params.id, req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated Operation",
        data.id,
        WHAT_WE_DO_MESSAGES.OPERATION_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATION_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteOperation(req, res, next) {
    try {
      await whatWeDoService.deleteOperation(req.params.id);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Deleted Operation",
        req.params.id,
        WHAT_WE_DO_MESSAGES.OPERATION_DELETED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATION_DELETED
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleOperationStatus(req, res, next) {
    try {
      const data = await whatWeDoService.toggleOperationStatus(req.params.id);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Toggle Operation Status",
        data.id,
        WHAT_WE_DO_MESSAGES.OPERATION_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATION_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async reorderOperations(req, res, next) {
    try {
      const data = await whatWeDoService.reorderOperations(req.body.ids);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Reordered Operations",
        null,
        WHAT_WE_DO_MESSAGES.OPERATIONS_FETCHED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.OPERATIONS_FETCHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Services
  async getAllServices(req, res, next) {
    try {
      const pageDoc = await whatWeDoService.get();

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICES_FETCHED,
        data: pageDoc.servicesList
      });
    } catch (error) {
      next(error);
    }
  }

  async getServiceById(req, res, next) {
    try {
      const data = await whatWeDoService.getServiceById(req.params.id);

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICES_FETCHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async createService(req, res, next) {
    try {
      const data = await whatWeDoService.addService(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Created Service",
        data.id,
        WHAT_WE_DO_MESSAGES.SERVICE_CREATED,
        "What We Do"
      );

      res.status(201).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICE_CREATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async updateService(req, res, next) {
    try {
      const data = await whatWeDoService.updateService(req.params.id, req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated Service",
        data.id,
        WHAT_WE_DO_MESSAGES.SERVICE_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICE_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteService(req, res, next) {
    try {
      await whatWeDoService.deleteService(req.params.id);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Deleted Service",
        req.params.id,
        WHAT_WE_DO_MESSAGES.SERVICE_DELETED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICE_DELETED
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleServiceStatus(req, res, next) {
    try {
      const data = await whatWeDoService.toggleServiceStatus(req.params.id);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Toggle Service Status",
        data.id,
        WHAT_WE_DO_MESSAGES.SERVICE_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICE_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  async reorderServices(req, res, next) {
    try {
      const data = await whatWeDoService.reorderServices(req.body.ids);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Reordered Services",
        null,
        WHAT_WE_DO_MESSAGES.SERVICES_FETCHED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SERVICES_FETCHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Quote Banner
  async getQuoteBanner(req, res, next) {
    try {
      const pageDoc = await whatWeDoService.get();

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.QUOTE_FETCHED,
        data: pageDoc.quoteBanner
      });
    } catch (error) {
      next(error);
    }
  }

  async updateQuoteBanner(req, res, next) {
    try {
      const data = await whatWeDoService.updateQuoteBanner(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated Quote Banner",
        null,
        WHAT_WE_DO_MESSAGES.QUOTE_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.QUOTE_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // SEO
  async getSeo(req, res, next) {
    try {
      const pageDoc = await whatWeDoService.get();

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SEO_FETCHED,
        data: pageDoc.seo
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSeo(req, res, next) {
    try {
      const data = await whatWeDoService.updateSeo(req.body, req.file);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated SEO",
        null,
        WHAT_WE_DO_MESSAGES.SEO_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SEO_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Section Settings
  async getSectionSettings(req, res, next) {
    try {
      const pageDoc = await whatWeDoService.get();

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SETTINGS_FETCHED,
        data: pageDoc.sectionSettings
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSectionSettings(req, res, next) {
    try {
      const data = await whatWeDoService.updateSectionSettings(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Updated Section Settings",
        null,
        WHAT_WE_DO_MESSAGES.SETTINGS_UPDATED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.SETTINGS_UPDATED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Draft Save
  async saveDraft(req, res, next) {
    try {
      const data = await whatWeDoService.saveDraft(req.body);

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.DRAFT_SAVED,
        data
      });
    } catch (error) {
      next(error);
    }
  }

  // Publish
  async publish(req, res, next) {
    try {
      const data = await whatWeDoService.publish(req.body);

      await activityLogService.logAction(
        req.admin?.id || 'admin',
        "Published What We Do",
        null,
        WHAT_WE_DO_MESSAGES.PUBLISHED,
        "What We Do"
      );

      res.status(200).json({
        success: true,
        message: WHAT_WE_DO_MESSAGES.PUBLISHED,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new WhatWeDoController();
