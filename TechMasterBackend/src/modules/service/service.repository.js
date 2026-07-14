import Service from "./service.model.js";

/* ===========================================================
   MAIN
=========================================================== */

export const findService = async () => {
  return await Service.findOne();
};

export const createService = async (payload) => {
  return await Service.create(payload);
};

export const deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};

/* ===========================================================
   SINGLE SECTION UPDATE
=========================================================== */

export const updateHero = async (payload) => {
  return await Service.findOneAndUpdate(
    {},
    { hero: payload },
    { new: true, upsert: true }
  );
};

export const updateCTA = async (payload) => {
  return await Service.findOneAndUpdate(
    {},
    { cta: payload },
    { new: true, upsert: true }
  );
};

export const updateSEO = async (payload) => {
  return await Service.findOneAndUpdate(
    {},
    { seo: payload },
    { new: true, upsert: true }
  );
};

/* ===========================================================
   DOCUMENT
=========================================================== */

export const getDocument = async () => {
  return await Service.findOne();
};

export const saveDocument = async (doc) => {
  return await doc.save();
};

/* ===========================================================
   SECTION SETTINGS
=========================================================== */

export const updateSectionSettings = async (section, payload) => {
  return await Service.findOneAndUpdate(
    {},
    {
      $set: {
        [`sectionSettings.${section}`]: payload,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
};

/* ===========================================================
   DRAFT
=========================================================== */

export const saveDraft = async () => {
  return await Service.findOneAndUpdate(
    {},
    {
      isDraft: true,
      isPublished: false,
    },
    {
      new: true,
      upsert: true,
    }
  );
};

/* ===========================================================
   PUBLISH
=========================================================== */

export const publishService = async () => {
  return await Service.findOneAndUpdate(
    {},
    {
      isPublished: true,
      isDraft: false,
    },
    {
      new: true,
      upsert: true,
    }
  );
};

export const unpublishService = async () => {
  return await Service.findOneAndUpdate(
    {},
    {
      isPublished: false,
    },
    {
      new: true,
    }
  );
};
