import { Campaign, Launch } from "./campaigns.model.js";
import MESSAGES from "../../constants/message.js";

/* ==========================================================
   CAMPAIGN SERVICE
========================================================== */

class CampaignService {

  async getCampaignDoc() {
    let doc = await Campaign.findOne();
    if (!doc) doc = await Campaign.create({});
    return doc;
  }

  // ---- Hero ----
  async getHero() {
    const doc = await this.getCampaignDoc();
    return doc.hero;
  }

  async updateHero(data) {
    const doc = await this.getCampaignDoc();
    doc.hero.smallBadge = data.smallBadge ?? doc.hero.smallBadge;
    doc.hero.highlightWord = data.highlightWord ?? doc.hero.highlightWord;
    doc.hero.headline = data.headline ?? doc.hero.headline;
    doc.hero.description = data.description ?? doc.hero.description;
    await doc.save();
    return doc.hero;
  }

  // ---- Campaign List ----
  async getAllCampaigns() {
    const doc = await this.getCampaignDoc();
    return doc.campaignsList;
  }

  async getCampaignById(id) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.campaignsList, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    return item;
  }

  async addCampaign(data) {
    const doc = await this.getCampaignDoc();
    doc.campaignsList.push({
      title: data.title,
      sponsor: data.sponsor,
      reach: data.reach,
      description: data.description,
      highlights: data.highlights || [],
      accentColor: data.accentColor || "#D4AF37",
      coverImage: data.coverImage || "",
      status: data.status || "Active",
      order: data.order || doc.campaignsList.length + 1,
    });
    await doc.save();
    return doc.campaignsList[doc.campaignsList.length - 1];
  }

  async updateCampaign(id, data) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.campaignsList, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    if (data.title !== undefined) item.title = data.title;
    if (data.sponsor !== undefined) item.sponsor = data.sponsor;
    if (data.reach !== undefined) item.reach = data.reach;
    if (data.description !== undefined) item.description = data.description;
    if (data.highlights !== undefined) item.highlights = data.highlights;
    if (data.accentColor !== undefined) item.accentColor = data.accentColor;
    if (data.coverImage !== undefined) item.coverImage = data.coverImage;
    if (data.status !== undefined) item.status = data.status;
    if (data.order !== undefined) item.order = data.order;
    await doc.save();
    return item;
  }

  async deleteCampaign(id) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.campaignsList, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    item.deleteOne();
    await doc.save();
    return doc;
  }

  // ---- Lifecycle ----
  async getAllLifecycle() {
    const doc = await this.getCampaignDoc();
    return doc.lifecycle;
  }

  async addLifecycle(data) {
    const doc = await this.getCampaignDoc();
    doc.lifecycle.push({
      title: data.title,
      description: data.description,
      status: data.status || "Active",
      order: data.order || doc.lifecycle.length + 1,
    });
    await doc.save();
    return doc.lifecycle[doc.lifecycle.length - 1];
  }

  async updateLifecycle(id, data) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.lifecycle, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.status !== undefined) item.status = data.status;
    if (data.order !== undefined) item.order = data.order;
    await doc.save();
    return item;
  }

  async deleteLifecycle(id) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.lifecycle, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    item.deleteOne();
    await doc.save();
    return doc;
  }

  // ---- Success Stories ----
  async getAllSuccessStories() {
    const doc = await this.getCampaignDoc();
    return doc.successStories;
  }

  async addSuccessStory(data) {
    const doc = await this.getCampaignDoc();
    doc.successStories.push({
      title: data.title,
      description: data.description,
      linkText: data.linkText,
      accentColor: data.accentColor || "#D4AF37",
      status: data.status || "Active",
      order: data.order || doc.successStories.length + 1,
    });
    await doc.save();
    return doc.successStories[doc.successStories.length - 1];
  }

  async updateSuccessStory(id, data) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.successStories, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.linkText !== undefined) item.linkText = data.linkText;
    if (data.accentColor !== undefined) item.accentColor = data.accentColor;
    if (data.status !== undefined) item.status = data.status;
    if (data.order !== undefined) item.order = data.order;
    await doc.save();
    return item;
  }

  async deleteSuccessStory(id) {
    const doc = await this.getCampaignDoc();
    const item = this.#findSubdoc(doc.successStories, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    item.deleteOne();
    await doc.save();
    return doc;
  }

  // ---- SEO ----
  async getSeo() {
    const doc = await this.getCampaignDoc();
    return doc.seo;
  }

  async updateSeo(data) {
    const doc = await this.getCampaignDoc();
    doc.seo.metaTitle = data.metaTitle ?? doc.seo.metaTitle;
    doc.seo.metaDescription = data.metaDescription ?? doc.seo.metaDescription;
    doc.seo.metaKeywords = data.metaKeywords ?? doc.seo.metaKeywords;
    doc.seo.ogImageUrl = data.ogImageUrl ?? doc.seo.ogImageUrl;
    await doc.save();
    return doc.seo;
  }

  // Private helper
  #findSubdoc(array, id) {
    const normalizedId = id?.toString?.();
    let item = array?.id?.(normalizedId);
    if (!item && Array.isArray(array)) {
      item = array.find((i) => i?._id?.toString?.() === normalizedId);
    }
    return item;
  }
}

/* ==========================================================
   LAUNCH SERVICE
========================================================== */

class LaunchService {

  async getLaunchDoc() {
    let doc = await Launch.findOne();
    if (!doc) doc = await Launch.create({});
    return doc;
  }

  // ---- Hero ----
  async getHero() {
    const doc = await this.getLaunchDoc();
    return doc.hero;
  }

  async updateHero(data) {
    const doc = await this.getLaunchDoc();
    doc.hero.smallBadge = data.smallBadge ?? doc.hero.smallBadge;
    doc.hero.highlightWord = data.highlightWord ?? doc.hero.highlightWord;
    doc.hero.headline = data.headline ?? doc.hero.headline;
    doc.hero.description = data.description ?? doc.hero.description;
    await doc.save();
    return doc.hero;
  }

  // ---- Products ----
  async getAllProducts() {
    const doc = await this.getLaunchDoc();
    return doc.products;
  }

  async getProductById(id) {
    const doc = await this.getLaunchDoc();
    const item = this.#findSubdoc(doc.products, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    return item;
  }

  async addProduct(data) {
    const doc = await this.getLaunchDoc();
    doc.products.push({
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      icon: data.icon || "Laptop",
      accentColor: data.accentColor || "#D4AF37",
      status: data.status || "Active Launch",
      order: data.order || doc.products.length + 1,
    });
    await doc.save();
    return doc.products[doc.products.length - 1];
  }

  async updateProduct(id, data) {
    const doc = await this.getLaunchDoc();
    const item = this.#findSubdoc(doc.products, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    if (data.title !== undefined) item.title = data.title;
    if (data.tagline !== undefined) item.tagline = data.tagline;
    if (data.description !== undefined) item.description = data.description;
    if (data.icon !== undefined) item.icon = data.icon;
    if (data.accentColor !== undefined) item.accentColor = data.accentColor;
    if (data.status !== undefined) item.status = data.status;
    if (data.order !== undefined) item.order = data.order;
    await doc.save();
    return item;
  }

  async deleteProduct(id) {
    const doc = await this.getLaunchDoc();
    const item = this.#findSubdoc(doc.products, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    item.deleteOne();
    await doc.save();
    return doc;
  }

  // ---- Feature Video ----
  async getFeatureVideo() {
    const doc = await this.getLaunchDoc();
    return doc.featureVideo;
  }

  async updateFeatureVideo(data) {
    const doc = await this.getLaunchDoc();
    doc.featureVideo.smallBadge = data.smallBadge ?? doc.featureVideo.smallBadge;
    doc.featureVideo.headline = data.headline ?? doc.featureVideo.headline;
    doc.featureVideo.description = data.description ?? doc.featureVideo.description;
    doc.featureVideo.trailerBtnText = data.trailerBtnText ?? doc.featureVideo.trailerBtnText;
    doc.featureVideo.notesBtnText = data.notesBtnText ?? doc.featureVideo.notesBtnText;
    doc.featureVideo.videoUrl = data.videoUrl ?? doc.featureVideo.videoUrl;
    doc.featureVideo.thumbnailUrl = data.thumbnailUrl ?? doc.featureVideo.thumbnailUrl;
    await doc.save();
    return doc.featureVideo;
  }

  // ---- Initiatives ----
  async getAllInitiatives() {
    const doc = await this.getLaunchDoc();
    return doc.initiatives;
  }

  async addInitiative(data) {
    const doc = await this.getLaunchDoc();
    doc.initiatives.push({
      title: data.title,
      description: data.description,
      status: data.status || "Active",
      order: data.order || doc.initiatives.length + 1,
    });
    await doc.save();
    return doc.initiatives[doc.initiatives.length - 1];
  }

  async updateInitiative(id, data) {
    const doc = await this.getLaunchDoc();
    const item = this.#findSubdoc(doc.initiatives, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    if (data.title !== undefined) item.title = data.title;
    if (data.description !== undefined) item.description = data.description;
    if (data.status !== undefined) item.status = data.status;
    if (data.order !== undefined) item.order = data.order;
    await doc.save();
    return item;
  }

  async deleteInitiative(id) {
    const doc = await this.getLaunchDoc();
    const item = this.#findSubdoc(doc.initiatives, id);
    if (!item) throw new Error(MESSAGES.NOT_FOUND);
    item.deleteOne();
    await doc.save();
    return doc;
  }

  // ---- SEO ----
  async getSeo() {
    const doc = await this.getLaunchDoc();
    return doc.seo;
  }

  async updateSeo(data) {
    const doc = await this.getLaunchDoc();
    doc.seo.metaTitle = data.metaTitle ?? doc.seo.metaTitle;
    doc.seo.metaDescription = data.metaDescription ?? doc.seo.metaDescription;
    doc.seo.metaKeywords = data.metaKeywords ?? doc.seo.metaKeywords;
    doc.seo.ogImageUrl = data.ogImageUrl ?? doc.seo.ogImageUrl;
    await doc.save();
    return doc.seo;
  }

  // Private helper
  #findSubdoc(array, id) {
    const normalizedId = id?.toString?.();
    let item = array?.id?.(normalizedId);
    if (!item && Array.isArray(array)) {
      item = array.find((i) => i?._id?.toString?.() === normalizedId);
    }
    return item;
  }
}

export const campaignService = new CampaignService();
export const launchService = new LaunchService();
