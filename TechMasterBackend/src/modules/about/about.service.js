import aboutRepository from "./about.repository.js";
import activityLogService from "../activityLog/activityLog.service.js";
import cloudinary from "../../config/cloudinary.js";
import deleteFile from "../../utils/deleteFile.js";
import MESSAGES from "../../constants/message.js";
import uploadFile from "../../utils/uploadFile.js";

const LOG_MODULE = "About";

class AboutService {
  /**
   * Get About CMS
   */
  async getAbout() {
    let about = await aboutRepository.getAbout();

    if (!about) {
      about = await aboutRepository.create({});
    } else {
      if (!about.introduction) about.introduction = {};
      if (!about.story) about.story = {};
      if (!about.vision) about.vision = {};
      if (!about.seo) about.seo = {};
      if (!about.sections) about.sections = {};
    }

    return about;
  }

  /**
   * Update Generic Section Data
   */
  async updateSectionData(sectionKey, data, adminId) {
    const about = await this.getAbout();
    about[sectionKey] = data;
    about.updatedBy = adminId;
    about.markModified(sectionKey);
    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: `Update ${sectionKey}`,
      referenceId: result._id,
      performedBy: adminId,
      description: `${sectionKey} updated successfully.`,
    });

    return result;
  }

  /**
   * Update Introduction
   */
  async updateIntroduction(data, file, adminId) {
    const about = await this.getAbout();

    about.introduction.title = data.title;
    about.introduction.subtitle = data.subtitle;
    about.introduction.description = data.description;
    about.introduction.buttonText = data.buttonText;
    about.introduction.buttonLink = data.buttonLink;

    if (file) {
      if (about.introduction.profileImage?.publicId) {
        await cloudinary.uploader.destroy(
          about.introduction.profileImage.publicId
        );
      }

      about.introduction.profileImage = {
        url: file.path,
        publicId: file.filename,
        alt: data.title,
        type: "image",
        size: file.size,
        mimeType: file.mimetype,
      };

      deleteFile(file.path);
    }

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Introduction",
      referenceId: result._id,
      performedBy: adminId,
      description: "Introduction section updated successfully.",
    });

    return result;
  }

  /**
   * Update Story
   */
  async updateStory(data, adminId) {
    const about = await this.getAbout();

    if (!data) data = {};
    if (!about.story) about.story = {};

    about.story.heading = data.heading;
    about.story.storyContent = data.storyContent;

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Story",
      referenceId: result._id,
      performedBy: adminId,
      description: "Story section updated successfully.",
    });

    return result;
  }

  /**
   * Update Vision
   */
  async updateVision(data = {}, adminId) {
    const about = await this.getAbout();

    about.vision.visionTitle = data.visionTitle;
    about.vision.visionDescription = data.visionDescription;

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Vision",
      referenceId: result._id,
      performedBy: adminId,
      description: "Vision section updated successfully.",
    });

    return result;
  }

  /**
   * Upload Story Gallery Image
   */
  async uploadStoryImage(file, adminId) {
    if (!file) throw new Error("Please upload an image file.");
    const about = await this.getAbout();

    about.story.gallery.push({
      url: file.path,
      publicId: file.filename,
      alt: "",
      type: "image",
      size: file.size,
      mimeType: file.mimetype,
    });

    deleteFile(file.path);

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Upload Story Image",
      referenceId: result._id,
      performedBy: adminId,
      description: "Story gallery image uploaded successfully.",
    });

    return result;
  }
  /**
   * Upload Story Video
   */
  async uploadStoryVideo(file, adminId) {
    if (!file) throw new Error("Please upload a video file.");
    const about = await this.getAbout();

    if (about.story.featuredVideo?.publicId) {
      await cloudinary.uploader.destroy(
        about.story.featuredVideo.publicId,
        {
          resource_type: "video",
        }
      );
    }

    const uploaded = await uploadFile(file.buffer, "about", "video");

    about.story.featuredVideo = {
      url: uploaded.url,
      publicId: uploaded.publicId,
      alt: "Story Video",
      type: "video",
      size: file.size,
      mimeType: file.mimetype,
    };

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Upload Story Video",
      referenceId: result._id,
      performedBy: adminId,
      description: "Story video uploaded successfully.",
    });

    return result;
  }

  /**
   * Delete Story Gallery Image
   */
  async deleteStoryImage(imageId, adminId) {
    const about = await this.getAbout();

    const image = about.story.gallery.id(imageId);

    if (!image) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    image.deleteOne();

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Story Image",
      referenceId: result._id,
      performedBy: adminId,
      description: "Story gallery image deleted successfully.",
    });

    return result;
  }

  /**
   * Delete Story Video
   */
  async deleteStoryVideo(adminId) {
    const about = await this.getAbout();

    if (about.story.featuredVideo?.publicId) {
      await cloudinary.uploader.destroy(
        about.story.featuredVideo.publicId,
        {
          resource_type: "video",
        }
      );
    }

    about.story.featuredVideo = {};

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Story Video",
      referenceId: result._id,
      performedBy: adminId,
      description: "Story video deleted successfully.",
    });

    return result;
  }

  /**
   * Update Highlights
   */
  async updateHighlights(highlights, adminId) {
    const about = await this.getAbout();

    about.highlights = highlights;
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Highlights",
      referenceId: result._id,
      performedBy: adminId,
      description: "Highlights updated successfully.",
    });

    return result;
  }

  /**
   * Reorder Highlights
   */
  async reorderHighlights(highlights, adminId) {
    const about = await this.getAbout();

    about.highlights = highlights;
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Reorder Highlights",
      referenceId: result._id,
      performedBy: adminId,
      description: "Highlights reordered successfully.",
    });

    return result;
  }
  /**
   * Add Achievement
   */
  async addAchievement(data, file, adminId) {
    const about = await this.getAbout();

    const achievement = {
      title: data.title,
      description: data.description,
      year: data.year,
      order: data.order || about.achievements.length + 1,
      isActive: true,
    };

    if (file) {
      achievement.image = {
        url: file.path,
        publicId: file.filename,
        alt: data.title,
        type: "image",
        size: file.size,
        mimeType: file.mimetype,
      };

      deleteFile(file.path);
    }

    about.achievements.push(achievement);
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Add Achievement",
      referenceId: result._id,
      performedBy: adminId,
      description: "Achievement added successfully.",
    });

    return result;
  }

  /**
   * Update Achievement
   */
  async updateAchievement(id, data, file, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();
    let achievement = about.achievements?.id(normalizedId);

    if (!achievement && Array.isArray(about.achievements)) {
      achievement = about.achievements.find(
        (a) => a?._id?.toString?.() === normalizedId || a?.image?._id?.toString?.() === normalizedId
      );
    }

    if (!achievement) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    achievement.title = data.title;
    achievement.description = data.description;
    achievement.year = data.year;
    achievement.order = data.order;
    achievement.isActive = data.isActive;

    if (file) {
      if (achievement.image?.publicId) {
        await cloudinary.uploader.destroy(
          achievement.image.publicId
        );
      }

      achievement.image = {
        url: file.path,
        publicId: file.filename,
        alt: data.title,
        type: "image",
        size: file.size,
        mimeType: file.mimetype,
      };

      deleteFile(file.path);
    }

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Achievement",
      referenceId: result._id,
      performedBy: adminId,
      description: "Achievement updated successfully.",
    });

    return result;
  }

  /**
   * Delete Achievement
   */
  async deleteAchievement(id, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();
    let achievement = about.achievements?.id(normalizedId);

    if (!achievement && Array.isArray(about.achievements)) {
      achievement = about.achievements.find(
        (a) => a?._id?.toString?.() === normalizedId || a?.image?._id?.toString?.() === normalizedId
      );
    }

    if (!achievement) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (achievement.image?.publicId) {
      await cloudinary.uploader.destroy(
        achievement.image.publicId
      );
    }

    achievement.deleteOne();

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Achievement",
      referenceId: result._id,
      performedBy: adminId,
      description: "Achievement deleted successfully.",
    });

    return result;
  }
  /**
   * Add Award
   */
  async addAward(data, file, adminId) {
    const about = await this.getAbout();

    const award = {
      title: data.title,
      organization: data.organization,
      year: data.year,
      description: data.description,
      order: data.order || about.awards.length + 1,
      isActive: true,
    };

    if (file) {
      const uploaded = await uploadFile(file.buffer, "about", "auto");

      award.certificate = {
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: data.title,
        type: uploaded.format === "pdf" ? "document" : "image",
        size: uploaded.size,
        mimeType: file.mimetype,
      };
    }

    about.awards.push(award);
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Add Award",
      referenceId: result._id,
      performedBy: adminId,
      description: `Award "${data.title}" added successfully.`,
    });

    return result;
  }

  /**
   * Update Award
   */
  async updateAward(id, data, file, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();

    // Lookup by subdocument _id (normal case)
    let award = about.awards?.id(normalizedId);

    // Fallback: some mongoose versions/inputs may require manual search
    if (!award && Array.isArray(about.awards)) {
      award = about.awards.find(
        (a) => a?._id?.toString?.() === normalizedId || a?.certificate?._id?.toString?.() === normalizedId
      );
    }

    // Fallback: allow updating by `order` if UI sends order instead of subdoc _id
    if (!award) {
      const orderFromBody = Number(data?.order);
      if (!Number.isNaN(orderFromBody)) {
        award = about.awards.find((a) => Number(a?.order) === orderFromBody);
      }
    }

    if (!award) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (data?.title !== undefined) award.title = data.title;
    if (data?.organization !== undefined) award.organization = data.organization;
    if (data?.year !== undefined) award.year = data.year;
    if (data?.description !== undefined) award.description = data.description;
    if (data?.order !== undefined) award.order = data.order;
    if (data?.isActive !== undefined) award.isActive = data.isActive;

    if (file) {
      if (award.certificate?.publicId) {
        await cloudinary.uploader.destroy(
          award.certificate.publicId
        );
      }

      const uploaded = await uploadFile(file.buffer, "about", "auto");

      award.certificate = {
        url: uploaded.url,
        publicId: uploaded.publicId,
        alt: data.title,
        type: uploaded.format === "pdf" ? "document" : "image",
        size: uploaded.size,
        mimeType: file.mimetype,
      };
    }

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Award",
      referenceId: result._id,
      performedBy: adminId,
      description: `Award "${data.title}" updated successfully.`,
    });

    return result;
  }
  /**
   * Delete Award
   */
  async deleteAward(id, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();
    let award = about.awards?.id(normalizedId);

    if (!award && Array.isArray(about.awards)) {
      award = about.awards.find(
        (a) => a?._id?.toString?.() === normalizedId || a?.certificate?._id?.toString?.() === normalizedId
      );
    }

    if (!award) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (award.certificate?.publicId) {
      await cloudinary.uploader.destroy(
        award.certificate.publicId
      );
    }

    award.deleteOne();

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Award",
      referenceId: result._id,
      performedBy: adminId,
      description: `Award "${award.title}" deleted successfully.`,
    });

    return result;
  }

  /**
   * Add Experience
   */
  async addExperience(data, file, adminId) {
    const about = await this.getAbout();

    const experience = {
      company: data.company,
      position: data.position,
      duration: data.duration,
      description: data.description,
      order: data.order || about.experience.length + 1,
      isActive: true,
    };

    if (file) {
      experience.companyLogo = {
        url: file.path,
        publicId: file.filename,
        alt: data.company,
        type: "image",
        size: file.size,
        mimeType: file.mimetype,
      };

      deleteFile(file.path);
    }

    about.experience.push(experience);
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Add Experience",
      referenceId: result._id,
      performedBy: adminId,
      description: `Experience at "${data.company}" added successfully.`,
    });

    return result;
  }
  /**
   * Update Experience
   */
  async updateExperience(id, data, file, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();
    let experience = about.experience?.id(normalizedId);

    if (!experience && Array.isArray(about.experience)) {
      experience = about.experience.find(
        (e) => e?._id?.toString?.() === normalizedId || e?.companyLogo?._id?.toString?.() === normalizedId
      );
    }

    if (!experience) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    experience.company = data.company;
    experience.position = data.position;
    experience.duration = data.duration;
    experience.description = data.description;
    experience.order = data.order;
    experience.isActive = data.isActive;

    if (file) {
      if (experience.companyLogo?.publicId) {
        await cloudinary.uploader.destroy(
          experience.companyLogo.publicId
        );
      }

      experience.companyLogo = {
        url: file.path,
        publicId: file.filename,
        alt: data.company,
        type: "image",
        size: file.size,
        mimeType: file.mimetype,
      };

      deleteFile(file.path);
    }

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Experience",
      referenceId: result._id,
      performedBy: adminId,
      description: `Experience "${data.company}" updated successfully.`,
    });

    return result;
  }


  /**
   * Delete Experience
   */
  async deleteExperience(id, adminId) {
    const about = await this.getAbout();

    const normalizedId = id?.toString?.();
    let experience = about.experience?.id(normalizedId);

    if (!experience && Array.isArray(about.experience)) {
      experience = about.experience.find(
        (e) => e?._id?.toString?.() === normalizedId || e?.companyLogo?._id?.toString?.() === normalizedId
      );
    }

    if (!experience) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (experience.companyLogo?.publicId) {
      await cloudinary.uploader.destroy(
        experience.companyLogo.publicId
      );
    }

    experience.deleteOne();

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Experience",
      referenceId: result._id,
      performedBy: adminId,
      description: `Experience "${experience.company}" deleted successfully.`,
    });

    return result;
  }


  /**
   * Upload Vision Image
   */
  async uploadVisionImage(file, adminId) {
    if (!file) throw new Error("Please upload an image file.");
    const about = await this.getAbout();

    if (about.vision.image?.publicId) {
      await cloudinary.uploader.destroy(
        about.vision.image.publicId
      );
    }

    about.vision.image = {
      url: file.path,
      publicId: file.filename,
      alt: "Vision Image",
      type: "image",
      size: file.size,
      mimeType: file.mimetype,
    };

    deleteFile(file.path);

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Upload Vision Image",
      referenceId: result._id,
      performedBy: adminId,
      description: "Vision image uploaded successfully.",
    });

    return result;
  }


  /**
   * Delete Vision Image
   */
  async deleteVisionImage(adminId) {
    const about = await this.getAbout();

    if (about.vision.image?.publicId) {
      await cloudinary.uploader.destroy(
        about.vision.image.publicId
      );
    }

    about.vision.image = {};

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete Vision Image",
      referenceId: result._id,
      performedBy: adminId,
      description: "Vision image deleted successfully.",
    });

    return result;
  }
  /**
   * Update SEO
   */
  async updateSeo(data = {}, adminId) {
    const about = await this.getAbout();

    about.seo.metaTitle = data.metaTitle;
    about.seo.metaDescription = data.metaDescription;
    about.seo.keywords = data.keywords;
    about.seo.canonicalUrl = data.canonicalUrl;

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update SEO",
      referenceId: result._id,
      performedBy: adminId,
      description: "About SEO updated successfully.",
    });

    return result;
  }


  /**
   * Update Section Status
   */
  async updateSectionStatus(sectionName, enabled, adminId) {
    const about = await this.getAbout();

    if (!about.sections[sectionName]) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    about.sections[sectionName].enabled = enabled;

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Section Status",
      referenceId: result._id,
      performedBy: adminId,
      description: `${sectionName} section status updated.`,
    });

    return result;
  }


  /**
   * Reorder Sections
   */
  async reorderSections(sections, adminId) {
    const about = await this.getAbout();

    Object.keys(sections).forEach((section) => {
      if (about.sections[section]) {
        about.sections[section].order =
          sections[section].order;
      }
    });

    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Reorder Sections",
      referenceId: result._id,
      performedBy: adminId,
      description: "About sections reordered successfully.",
    });

    return result;
  }


  /**
   * Update Publish Status
   */
  async updatePublishStatus(status, adminId) {
    const about = await this.getAbout();

    about.publishStatus = status;
    about.updatedBy = adminId;

    const result = await aboutRepository.save(about);

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Update Publish Status",
      referenceId: result._id,
      performedBy: adminId,
      description: `About page ${status}.`,
    });

    return result;
  }


  /**
   * Delete Entire About Data
   */
  async deleteAbout(adminId) {
    const about = await this.getAbout();

    if (!about) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const result = await aboutRepository.delete(
      about._id
    );

    await activityLogService.logAction({
      module: LOG_MODULE,
      action: "Delete About",
      referenceId: about._id,
      performedBy: adminId,
      description: "About CMS data deleted.",
    });

    return result;
  }
}

export default new AboutService();
