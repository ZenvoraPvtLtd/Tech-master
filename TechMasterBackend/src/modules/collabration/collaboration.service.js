import collaborationRepository from "./collaboration.repository.js";

class CollaborationService {

  // ===========================
  // Collaboration
  // ===========================

  async create(data) {
    return await collaborationRepository.create(data);
  }

  async get() {
    return await collaborationRepository.get();
  }

  async delete(id) {
    return await collaborationRepository.deleteCollaboration(id);
  }

  // ===========================
  // Hero
  // ===========================

  async updateHero(data) {
    return await collaborationRepository.updateHero(data);
  }

  // ===========================
  // History
  // ===========================

  async updateHistory(data) {
    return await collaborationRepository.updateHistory(data);
  }

  // ===========================
  // SEO
  // ===========================

  async updateSeo(data) {
    return await collaborationRepository.updateSeo(data);
  }

  // ===========================
  // Brand Carousel
  // ===========================

  async getBrands() {
    return await collaborationRepository.getBrandCarousel();
  }

  async addBrand(data) {
    return await collaborationRepository.addBrand(data);
  }

  async updateBrand(id, data) {
    return await collaborationRepository.updateBrand(id, data);
  }

  async deleteBrand(id) {
    return await collaborationRepository.deleteBrand(id);
  }

  // ===========================
  // Partners
  // ===========================

  async getPartners() {
    return await collaborationRepository.getPartners();
  }

  async addPartner(data) {
    return await collaborationRepository.addPartner(data);
  }

  async updatePartner(id, data) {
    return await collaborationRepository.updatePartner(id, data);
  }

  async deletePartner(id) {
    return await collaborationRepository.deletePartner(id);
  }

  // ===========================
  // Metrics
  // ===========================

  async getMetrics() {
    return await collaborationRepository.getMetrics();
  }

  async addMetric(data) {
    return await collaborationRepository.addMetric(data);
  }

  async updateMetric(id, data) {
    return await collaborationRepository.updateMetric(id, data);
  }

  async deleteMetric(id) {
    return await collaborationRepository.deleteMetric(id);
  }
  // ===========================
  // Campaigns
  // ===========================

  async getCampaigns() {
    return await collaborationRepository.getCampaigns();
  }

  async addCampaign(data) {
    return await collaborationRepository.addCampaign(data);
  }

  async updateCampaign(id, data) {
    return await collaborationRepository.updateCampaign(id, data);
  }

  async deleteCampaign(id) {
    return await collaborationRepository.deleteCampaign(id);
  }

  // ===========================
  // Process
  // ===========================

  async getProcess() {
    return await collaborationRepository.getProcess();
  }

  async addProcess(data) {
    return await collaborationRepository.addProcess(data);
  }

  async updateProcess(id, data) {
    return await collaborationRepository.updateProcess(id, data);
  }

  async deleteProcess(id) {
    return await collaborationRepository.deleteProcess(id);
  }

  // ===========================
  // Testimonials
  // ===========================

  async getTestimonials() {
    return await collaborationRepository.getTestimonials();
  }

  async addTestimonial(data) {
    return await collaborationRepository.addTestimonial(data);
  }

  async updateTestimonial(id, data) {
    return await collaborationRepository.updateTestimonial(id, data);
  }

  async deleteTestimonial(id) {
    return await collaborationRepository.deleteTestimonial(id);
  }

  // ===========================
  // Section Settings
  // ===========================

  async updateSectionSettings(data) {
    return await collaborationRepository.updateSectionSettings(data);
  }

  // ===========================
  // Find By Id
  // ===========================

  async findById(id) {
    return await collaborationRepository.findById(id);
  }

  // ===========================
  // Save Document
  // ===========================

  async save(document) {
    return await collaborationRepository.save(document);
  }

}

export default new CollaborationService();