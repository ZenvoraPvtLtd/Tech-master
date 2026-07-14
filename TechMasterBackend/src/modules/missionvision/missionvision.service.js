import MissionVision from "./missionvision.model.js";

/* ===========================================================
   MAIN
=========================================================== */

export const getMissionVisionService = async () => {
  let data = await MissionVision.findOne();

  if (!data) {
    data = await MissionVision.create({});
  }

  return data;
};

export const createMissionVisionService = async (payload) => {
  const exists = await MissionVision.findOne();

  if (exists) {
    throw new Error("Mission Vision already exists.");
  }

  return await MissionVision.create(payload);
};

export const deleteMissionVisionService = async () => {
  const data = await MissionVision.findOne();

  if (!data) {
    throw new Error("Mission Vision not found.");
  }

  await MissionVision.findByIdAndDelete(data._id);

  return true;
};

/* ===========================================================
   SINGLE OBJECT UPDATE
=========================================================== */

export const updateHeroService = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { hero: payload },
    { new: true, upsert: true }
  );
};

export const updateMissionService = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { mission: payload },
    { new: true, upsert: true }
  );
};

export const updateVisionService = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { vision: payload },
    { new: true, upsert: true }
  );
};

export const updateCTAService = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { cta: payload },
    { new: true, upsert: true }
  );
};

export const updateSEOService = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { seo: payload },
    { new: true, upsert: true }
  );
};

/* ===========================================================
   COMMON DOCUMENT
=========================================================== */

export const getDocument = async () => {
  const doc = await MissionVision.findOne();

  if (!doc) {
    throw new Error("Mission Vision not found.");
  }

  return doc;
};

export const saveDocument = async (doc) => {
  return await doc.save();
};

/* ===========================================================
   SECTION SETTINGS
=========================================================== */

export const updateSectionSettingsService = async (
  section,
  payload
) => {
  return await MissionVision.findOneAndUpdate(
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

export const saveDraftService = async () => {
  return await MissionVision.findOneAndUpdate(
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

export const publishMissionVisionService = async () => {
  return await MissionVision.findOneAndUpdate(
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

export const unpublishMissionVisionService = async () => {
  return await MissionVision.findOneAndUpdate(
    {},
    {
      isPublished: false,
    },
    {
      new: true,
    }
  );
};