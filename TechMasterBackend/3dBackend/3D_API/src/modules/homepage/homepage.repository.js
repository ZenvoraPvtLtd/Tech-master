import HomepageSetting from "./homepage.model.js";

class HomepageRepository {
  /**
   * Initialize default settings if none exist
   */
  async _initSettings() {
    const defaultSections = [
      "hero",
      "video_slider",
      "reels",
      "shorts",
      "long_videos",
      "featured_services",
      "journey_highlights",
      "brand_collaborations",
      "featured_campaigns",
      "testimonials",
      "statistics",
      "newsletter",
      "contact",
    ].map((type, index) => ({
      type,
      customName: "",
      isActive: true,
      order: index + 1,
    }));

    const settings = await HomepageSetting.create({
      heroSlider: [],
      sections: defaultSections,
      isDraft: true,
    });
      
    return settings;
  }

  /**
   * Get Homepage Settings
   */
  async getSettings() {
    let settings = await HomepageSetting.findOne();

    if (!settings) {
      settings = await this._initSettings();
    }

    return settings;
  }

  /**
   * Update Homepage Settings
   */
  async updateSettings(updateData) {
    const settings = await this.getSettings();

    if (updateData.sections) {
      settings.sections = updateData.sections;
    }

    if (typeof updateData.isDraft === "boolean") {
      settings.isDraft = updateData.isDraft;
    }
    return await settings.save();
  }

  /**
   * Add New Section
   */
  async addSection(sectionData) {
    const settings = await this.getSettings();

    settings.sections.push(sectionData);

    return await settings.save();
  }

  /**
   * Delete Section
   */
  async deleteSection(type) {
    const settings = await this.getSettings();

    settings.sections = settings.sections.filter(
      (section) => section.type !== type
    );
      settings.sections.forEach((section, index) => {
      section.order = index + 1;
});

    return await settings.save();
  }

  /**
   * Reset Homepage
   */
  async resetHomepage() {
    const settings = await this.getSettings();

    settings.heroSlider = [];

    settings.sections = [
      "hero",
      "video_slider",
      "reels",
      "shorts",
      "long_videos",
      "featured_services",
      "journey_highlights",
      "brand_collaborations",
      "featured_campaigns",
      "testimonials",
      "statistics",
      "newsletter",
      "contact",
    ].map((type, index) => ({
      type,
      customName: "",
      isActive: true,
      order: index + 1,
    }));

    settings.isDraft = true;

    return await settings.save();
  }

  /**
   * Public Homepage Data
   */
  async getPublicSettings() {
    return await this.getSettings();

    settings.sections = settings.sections
      .filter((section) => section.isActive)
      .sort((a, b) => a.order - b.order);
      return settings;
  }

  /**
   * Save Model Instance
   */
  async save(document) {
    return await document.save();
  }

  // ─────────────────────────────────────────────
  //  VIDEO SLIDER
  // ─────────────────────────────────────────────

  /**
   * Get all Video Sliders sorted by order
   */
  async getVideoSliders() {
    const settings = await this.getSettings();
    return settings.videoSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single Video Slider by subdocument ID
   */
  async getVideoSliderById(id) {
    const settings = await this.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");
    return item;
  }

  /**
   * Add a new Video Slider item
   */
  async addVideoSlider(data) {
    const settings = await this.getSettings();
    settings.videoSlider.push(data);
    return await this.save(settings);
  }

  /**
   * Update a Video Slider item by subdocument ID
   */
  async updateVideoSlider(id, updateData) {
    const settings = await this.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");
    Object.assign(item, updateData);
    return await this.save(settings);
  }

  /**
   * Delete a Video Slider item by subdocument ID
   */
  async deleteVideoSlider(id) {
    const settings = await this.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");
    settings.videoSlider = settings.videoSlider.filter(
      (v) => v._id.toString() !== id
    );
    return await this.save(settings);
  }

  /**
   * Toggle isActive flag of a Video Slider item
   */
  async toggleVideoSlider(id) {
    const settings = await this.getSettings();
    const item = settings.videoSlider.id(id);
    if (!item) throw new Error("Video slider not found");
    item.isActive = !item.isActive;
    return await this.save(settings);
  }

  /**
   * Reorder Video Sliders using an array of { id, order } pairs
   */
  async reorderVideoSlider(orderedItems) {
    const settings = await this.getSettings();
    orderedItems.forEach(({ id, order }) => {
      const item = settings.videoSlider.id(id);
      if (item) item.order = Number(order);
    });
    return await this.save(settings);
  }

  // ─────────────────────────────────────────────
  //  REELS
  // ─────────────────────────────────────────────

  /**
   * Get all Reels sorted by order
   */
  async getReels() {
    const settings = await this.getSettings();
    return settings.reels.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single Reel by subdocument ID
   */
  async getReelById(id) {
    const settings = await this.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");
    return item;
  }

  /**
   * Add a new Reel item
   */
  async addReel(data) {
    const settings = await this.getSettings();
    settings.reels.push(data);
    return await this.save(settings);
  }

  /**
   * Update a Reel item by subdocument ID
   */
  async updateReel(id, updateData) {
    const settings = await this.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");
    Object.assign(item, updateData);
    return await this.save(settings);
  }

  /**
   * Delete a Reel item by subdocument ID
   */
  async deleteReel(id) {
    const settings = await this.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");
    settings.reels = settings.reels.filter(
      (r) => r._id.toString() !== id
    );
    return await this.save(settings);
  }

  /**
   * Toggle isActive flag of a Reel item
   */
  async toggleReel(id) {
    const settings = await this.getSettings();
    const item = settings.reels.id(id);
    if (!item) throw new Error("Reel not found");
    item.isActive = !item.isActive;
    return await this.save(settings);
  }

  /**
   * Reorder Reels using an array of { id, order } pairs
   */
  async reorderReels(orderedItems) {
    const settings = await this.getSettings();
    orderedItems.forEach(({ id, order }) => {
      const item = settings.reels.id(id);
      if (item) item.order = Number(order);
    });
    return await this.save(settings);
  }

  // ─────────────────────────────────────────────
  //  SHORTS
  // ─────────────────────────────────────────────

  /**
   * Get all Shorts sorted by order
   */
  async getShorts() {
    const settings = await this.getSettings();
    return settings.shorts.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single Short by subdocument ID
   */
  async getShortById(id) {
    const settings = await this.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");
    return item;
  }

  /**
   * Add a new Short item
   */
  async addShort(data) {
    const settings = await this.getSettings();
    settings.shorts.push(data);
    return await this.save(settings);
  }

  /**
   * Update a Short item by subdocument ID
   */
  async updateShort(id, updateData) {
    const settings = await this.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");
    Object.assign(item, updateData);
    return await this.save(settings);
  }

  /**
   * Delete a Short item by subdocument ID
   */
  async deleteShort(id) {
    const settings = await this.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");
    settings.shorts = settings.shorts.filter(
      (s) => s._id.toString() !== id
    );
    return await this.save(settings);
  }

  /**
   * Toggle isActive flag of a Short item
   */
  async toggleShort(id) {
    const settings = await this.getSettings();
    const item = settings.shorts.id(id);
    if (!item) throw new Error("Short not found");
    item.isActive = !item.isActive;
    return await this.save(settings);
  }

  /**
   * Reorder Shorts using an array of { id, order } pairs
   */
  async reorderShorts(orderedItems) {
    const settings = await this.getSettings();
    orderedItems.forEach(({ id, order }) => {
      const item = settings.shorts.id(id);
      if (item) item.order = Number(order);
    });
    return await this.save(settings);
  }

  // ─────────────────────────────────────────────
  //  LONG VIDEOS
  // ─────────────────────────────────────────────

  /**
   * Get all Long Videos sorted by order
   */
  async getLongVideos() {
    const settings = await this.getSettings();
    return settings.longVideos.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single Long Video by subdocument ID
   */
  async getLongVideoById(id) {
    const settings = await this.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");
    return item;
  }

  /**
   * Add a new Long Video item
   */
  async addLongVideo(data) {
    const settings = await this.getSettings();
    settings.longVideos.push(data);
    return await this.save(settings);
  }

  /**
   * Update a Long Video item by subdocument ID
   */
  async updateLongVideo(id, updateData) {
    const settings = await this.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");
    Object.assign(item, updateData);
    return await this.save(settings);
  }

  /**
   * Delete a Long Video item by subdocument ID
   */
  async deleteLongVideo(id) {
    const settings = await this.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");
    settings.longVideos = settings.longVideos.filter(
      (v) => v._id.toString() !== id
    );
    return await this.save(settings);
  }

  /**
   * Toggle isActive flag of a Long Video item
   */
  async toggleLongVideo(id) {
    const settings = await this.getSettings();
    const item = settings.longVideos.id(id);
    if (!item) throw new Error("Long video not found");
    item.isActive = !item.isActive;
    return await this.save(settings);
  }

  /**
   * Reorder Long Videos using an array of { id, order } pairs
   */
  async reorderLongVideos(orderedItems) {
    const settings = await this.getSettings();
    orderedItems.forEach(({ id, order }) => {
      const item = settings.longVideos.id(id);
      if (item) item.order = Number(order);
    });
    return await this.save(settings);
  }

  // ─────────────────────────────────────────────
  //  HERO SLIDER
  // ─────────────────────────────────────────────

  /**
   * Get all Hero Sliders sorted by order
   */
  async getHeroSliders() {
    const settings = await this.getSettings();
    return settings.heroSlider.sort((a, b) => a.order - b.order);
  }

  /**
   * Get a single Hero Slider by subdocument ID
   */
  async getHeroSliderById(id) {
    const settings = await this.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");
    return item;
  }

  /**
   * Add a new Hero Slider item
   */
  async addHeroSlider(data) {
    const settings = await this.getSettings();
    settings.heroSlider.push(data);
    return await this.save(settings);
  }

  /**
   * Update a Hero Slider item by subdocument ID
   */
  async updateHeroSlider(id, updateData) {
    const settings = await this.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");
    Object.assign(item, updateData);
    return await this.save(settings);
  }

  /**
   * Delete a Hero Slider item by subdocument ID
   */
  async deleteHeroSlider(id) {
    const settings = await this.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");
    settings.heroSlider = settings.heroSlider.filter(
      (s) => s._id.toString() !== id
    );
    return await this.save(settings);
  }

  /**
   * Toggle isActive flag of a Hero Slider item
   */
  async toggleHeroSlider(id) {
    const settings = await this.getSettings();
    const item = settings.heroSlider.id(id);
    if (!item) throw new Error("Hero slider not found");
    item.isActive = !item.isActive;
    return await this.save(settings);
  }

  /**
   * Reorder Hero Sliders using an array of { id, order } pairs
   */
  async reorderHeroSliders(orderedItems) {
    const settings = await this.getSettings();
    orderedItems.forEach(({ id, order }) => {
      const item = settings.heroSlider.id(id);
      if (item) item.order = Number(order);
    });
    return await this.save(settings);
  }
}

export default new HomepageRepository();
