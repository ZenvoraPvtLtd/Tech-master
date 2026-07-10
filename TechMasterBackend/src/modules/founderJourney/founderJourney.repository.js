import { FounderJourneyItem, FounderJourneySetting } from "./founderJourney.model.js";

class FounderJourneyRepository {
  /**
   * Fetch all items (timeline or milestones)
   */
  async findAllItems(filter = {}, sort = { order: 1, createdAt: -1 }) {
    return await FounderJourneyItem.find(filter).sort(sort);
  }

  /**
   * Find a single item by ID
   */
  async findItemById(id) {
    return await FounderJourneyItem.findById(id);
  }

  /**
   * Create a new item (timeline/milestone)
   */
  async createItem(data) {
    return await FounderJourneyItem.create(data);
  }

  /**
   * Update an item by ID
   */
  async updateItem(id, data) {
    return await FounderJourneyItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete an item by ID
   */
  async deleteItem(id) {
    return await FounderJourneyItem.findByIdAndDelete(id);
  }

  /**
   * Find the highest order number for sorting list items of a given type
   */
  async findMaxOrder(type) {
    const lastItem = await FounderJourneyItem.findOne({ type })
      .sort({ order: -1 })
      .select("order");
    return lastItem ? lastItem.order : 0;
  }

  /**
   * Retrieve the settings document, creating a default one if none exists
   */
  async getSettings() {
    let settings = await FounderJourneySetting.findOne();
    if (!settings) {
      settings = await FounderJourneySetting.create({
        sections: {
          timeline: { isActive: true },
          milestones: { isActive: true },
          futureVision: { isActive: true },
        },
        futureVision: {
          futureHeading: "The Horizon of Immersive Media",
          futureDescription: "Driving dynamic visual architectures across global operations networks.",
        },
        isDraft: true,
      });
    }
    return settings;
  }

  /**
   * Update settings (singleton update)
   */
  async updateSettings(data) {
    return await FounderJourneySetting.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  /**
   * Save a document instance directly
   */
  async save(doc) {
    return await doc.save();
  }
}

export default new FounderJourneyRepository();
