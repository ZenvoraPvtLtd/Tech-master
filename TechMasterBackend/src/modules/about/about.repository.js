import About from "./about.model.js";

class AboutRepository {
  /**
   * Get About CMS
   */
  async getAbout() {
    return await About.findOne()
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Find About By Id
   */
  async findById(id) {
    return await About.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Create About
   */
  async create(data) {
    return await About.create(data);
  }

  /**
   * Save About Document
   */
  async save(about) {
    return await about.save();
  }

  /**
   * Update About
   */
  async update(id, data) {
    return await About.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Check About Exists
   */
  async exists() {
    return await About.exists({});
  }

  /**
   * Count Documents
   */
  async count() {
    return await About.countDocuments();
  }
/**
   * Update Publish Status
   */
  async updatePublishStatus(id, publishStatus) {
    return await About.findByIdAndUpdate(
      id,
      {
        publishStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Update Section Settings
   */
  async updateSection(id, sectionName, data) {
    return await About.findByIdAndUpdate(
      id,
      {
        $set: {
          [`sections.${sectionName}`]: data,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Update SEO
   */
  async updateSeo(id, seo) {
    return await About.findByIdAndUpdate(
      id,
      {
        seo,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Delete About
   */
  async delete(id) {
    return await About.findByIdAndDelete(id);
  }
}
export default new AboutRepository();