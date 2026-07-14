import MissionVision from "./missionvision.model.js";

/* ===========================================================
   MAIN
=========================================================== */

export const findMissionVision = async () => {
  return await MissionVision.findOne();
};

export const createMissionVision = async (payload) => {
  return await MissionVision.create(payload);
};

export const deleteMissionVision = async (id) => {
  return await MissionVision.findByIdAndDelete(id);
};

/* ===========================================================
   SINGLE SECTION UPDATE
=========================================================== */

export const updateHero = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { hero: payload },
    { new: true, upsert: true }
  );
};

export const updateMission = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { mission: payload },
    { new: true, upsert: true }
  );
};

export const updateVision = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { vision: payload },
    { new: true, upsert: true }
  );
};

export const updateCTA = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { cta: payload },
    { new: true, upsert: true }
  );
};

export const updateSEO = async (payload) => {
  return await MissionVision.findOneAndUpdate(
    {},
    { seo: payload },
    { new: true, upsert: true }
  );
};

/* ===========================================================
   DOCUMENT
=========================================================== */

export const getDocument = async () => {
  return await MissionVision.findOne();
};

export const saveDocument = async (doc) => {
  return await doc.save();
};

/* ===========================================================
   SECTION SETTINGS
=========================================================== */

export const updateSectionSettings = async (
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

export const saveDraft = async () => {
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

export const publishMissionVision = async () => {
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

export const unpublishMissionVision = async () => {
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