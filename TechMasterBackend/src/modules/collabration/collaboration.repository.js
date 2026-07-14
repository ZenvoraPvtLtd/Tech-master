import Collaboration from "./collaboration.model.js";

class CollaborationRepository {

  // ===========================
  // Create Collaboration
  // ===========================

  async create(data) {
    return await Collaboration.create(data);
  }

  // ===========================
  // Get Collaboration
  // ===========================

  async get() {
    return await Collaboration.findOne();
  }

  // ===========================
  // Hero
  // ===========================

  async updateHero(data) {
    return await Collaboration.findOneAndUpdate(
      {},
      {
        $set: {
          hero: data,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
  }

  // ===========================
  // History
  // ===========================

  async updateHistory(data) {
    return await Collaboration.findOneAndUpdate(
      {},
      {
        $set: {
          history: data,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
  }

  // ===========================
  // SEO
  // ===========================

  async updateSeo(data) {
    return await Collaboration.findOneAndUpdate(
      {},
      {
        $set: {
          seo: data,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
  }
// ===========================
// Brand Carousel - Get All
// ===========================

async getBrandCarousel() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.brandCarousel;
}

// ===========================
// Brand Carousel - Add
// ===========================

async addBrand(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      brandCarousel: [data],
    });
  }

  collaboration.brandCarousel.push(data);

  return await collaboration.save();
}

// ===========================
// Brand Carousel - Update
// ===========================

async updateBrand(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const brand = collaboration.brandCarousel.id(id);

  if (!brand) return null;

  Object.assign(brand, data);

  return await collaboration.save();
}

// ===========================
// Brand Carousel - Delete
// ===========================

async deleteBrand(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.brandCarousel =
    collaboration.brandCarousel.filter(
      item => item._id.toString() !== id
    );

  return await collaboration.save();
}
// ===========================
// Partners - Get All
// ===========================

async getPartners() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.partners;
}

// ===========================
// Partners - Add
// ===========================

async addPartner(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      partners: [data],
    });
  }

  collaboration.partners.push(data);

  return await collaboration.save();
}

// ===========================
// Partners - Update
// ===========================

async updatePartner(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const partner = collaboration.partners.id(id);

  if (!partner) return null;

  Object.assign(partner, data);

  return await collaboration.save();
}

// ===========================
// Partners - Delete
// ===========================

async deletePartner(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.partners = collaboration.partners.filter(
    (item) => item._id.toString() !== id
  );

  return await collaboration.save();
}
// ===========================
// Metrics - Get All
// ===========================

async getMetrics() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.metrics;
}

// ===========================
// Metrics - Add
// ===========================

async addMetric(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      metrics: [data],
    });
  }

  collaboration.metrics.push(data);

  return await collaboration.save();
}

// ===========================
// Metrics - Update
// ===========================

async updateMetric(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const metric = collaboration.metrics.id(id);

  if (!metric) return null;

  Object.assign(metric, data);

  return await collaboration.save();
}

// ===========================
// Metrics - Delete
// ===========================

async deleteMetric(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.metrics = collaboration.metrics.filter(
    (item) => item._id.toString() !== id
  );

  return await collaboration.save();
}
// ===========================
// Campaigns - Get All
// ===========================

async getCampaigns() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.campaigns;
}

// ===========================
// Campaigns - Add
// ===========================

async addCampaign(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      campaigns: [data],
    });
  }

  collaboration.campaigns.push(data);

  return await collaboration.save();
}

// ===========================
// Campaigns - Update
// ===========================

async updateCampaign(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const campaign = collaboration.campaigns.id(id);

  if (!campaign) return null;

  Object.assign(campaign, data);

  return await collaboration.save();
}

// ===========================
// Campaigns - Delete
// ===========================

async deleteCampaign(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.campaigns = collaboration.campaigns.filter(
    (item) => item._id.toString() !== id
  );

  return await collaboration.save();
}
// ===========================
// Process - Get All
// ===========================

async getProcess() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.process;
}

// ===========================
// Process - Add
// ===========================

async addProcess(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      process: [data],
    });
  }

  collaboration.process.push(data);

  return await collaboration.save();
}

// ===========================
// Process - Update
// ===========================

async updateProcess(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const process = collaboration.process.id(id);

  if (!process) return null;

  Object.assign(process, data);

  return await collaboration.save();
}

// ===========================
// Process - Delete
// ===========================

async deleteProcess(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.process = collaboration.process.filter(
    (item) => item._id.toString() !== id
  );

  return await collaboration.save();
}
// ===========================
// Testimonials - Get All
// ===========================

async getTestimonials() {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return [];

  return collaboration.testimonials;
}

// ===========================
// Testimonials - Add
// ===========================

async addTestimonial(data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) {
    return await Collaboration.create({
      testimonials: [data],
    });
  }

  collaboration.testimonials.push(data);

  return await collaboration.save();
}

// ===========================
// Testimonials - Update
// ===========================

async updateTestimonial(id, data) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  const testimonial = collaboration.testimonials.id(id);

  if (!testimonial) return null;

  Object.assign(testimonial, data);

  return await collaboration.save();
}

// ===========================
// Testimonials - Delete
// ===========================

async deleteTestimonial(id) {
  const collaboration = await Collaboration.findOne();

  if (!collaboration) return null;

  collaboration.testimonials = collaboration.testimonials.filter(
    (item) => item._id.toString() !== id
  );

  return await collaboration.save();
}
// ===========================
// Section Settings
// ===========================

async updateSectionSettings(data) {
  return await Collaboration.findOneAndUpdate(
    {},
    {
      $set: {
        sectionSettings: data,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
}

// ===========================
// Find By Id
// ===========================

async findById(id) {
  return await Collaboration.findById(id);
}

// ===========================
// Delete Collaboration
// ===========================

async deleteCollaboration(id) {
  return await Collaboration.findByIdAndDelete(id);
}

// ===========================
// Save Document
// ===========================

async save(document) {
  return await document.save();

}
}
export default new CollaborationRepository();
