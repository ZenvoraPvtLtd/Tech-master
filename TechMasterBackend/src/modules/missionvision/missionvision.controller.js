import MissionVision from "./missionvision.model.js";

/* ==========================================================
   GET MISSION VISION
========================================================== */

export const getMissionVision = async (req, res) => {
  try {
    let data = await MissionVision.findOne();

    if (!data) {
      data = await MissionVision.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Mission & Vision fetched successfully.",
      data,
    });
  } catch (error) {
    console.error("Get Mission Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Mission & Vision.",
      error: error.message,
    });
  }
};

/* ==========================================================
   CREATE MISSION VISION
========================================================== */

export const createMissionVision = async (req, res) => {
  try {
    const exists = await MissionVision.findOne();

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Mission & Vision already exists.",
      });
    }

    const missionVision = await MissionVision.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Mission & Vision created successfully.",
      data: missionVision,
    });
  } catch (error) {
    console.error("Create Mission Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Mission & Vision.",
      error: error.message,
    });
  }
};

/* ==========================================================
   DELETE MISSION VISION
========================================================== */

export const deleteMissionVision = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    await MissionVision.findByIdAndDelete(missionVision._id);

    return res.status(200).json({
      success: true,
      message: "Mission & Vision deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Mission Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Mission & Vision.",
      error: error.message,
    });
  }
};
/* ==========================================================
   UPDATE HERO
========================================================== */

export const updateHero = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

missionVision.hero = {
  ...(missionVision.hero?.toObject?.() || {}),
  ...req.body,
};

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Hero updated successfully.",
      data: missionVision.hero,
    });
  } catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Failed to update Hero.",
    error: error.message,
    stack: error.stack,
  });
}
};

/* ==========================================================
   UPDATE MISSION
========================================================== */

export const updateMission = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

   missionVision.mission = {
  ...(missionVision.mission?.toObject?.() || {}),
  ...req.body,
};

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Mission updated successfully.",
      data: missionVision.mission,
    });
  } catch (error) {
    console.error("Update Mission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Mission.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE VISION
========================================================== */

export const updateVision = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }
missionVision.vision = {
  ...(missionVision.vision?.toObject?.() || {}),
  ...req.body,
};

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Vision updated successfully.",
      data: missionVision.vision,
    });
  } catch (error) {
    console.error("Update Vision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Vision.",
      error: error.message,
    });
  }
};
/* ==========================================================
   ADD CORE VALUE
========================================================== */

export const addCoreValue = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.coreValues.push(req.body);

    await missionVision.save();

    return res.status(201).json({
      success: true,
      message: "Core Value added successfully.",
      data: missionVision.coreValues,
    });
  } catch (error) {
    console.error("Add Core Value Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add Core Value.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE CORE VALUE
========================================================== */

export const updateCoreValue = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const coreValue = missionVision.coreValues.id(id);

    if (!coreValue) {
      return res.status(404).json({
        success: false,
        message: "Core Value not found.",
      });
    }

    Object.assign(coreValue, req.body);

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Core Value updated successfully.",
      data: coreValue,
    });
  } catch (error) {
    console.error("Update Core Value Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Core Value.",
      error: error.message,
    });
  }
};

/* ==========================================================
   DELETE CORE VALUE
========================================================== */

export const deleteCoreValue = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const coreValue = missionVision.coreValues.id(id);

    if (!coreValue) {
      return res.status(404).json({
        success: false,
        message: "Core Value not found.",
      });
    }

    coreValue.deleteOne();

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Core Value deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Core Value Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Core Value.",
      error: error.message,
    });
  }
};
/* ==========================================================
   TOGGLE CORE VALUE STATUS
========================================================== */

export const toggleCoreValueStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const coreValue = missionVision.coreValues.id(id);

    if (!coreValue) {
      return res.status(404).json({
        success: false,
        message: "Core Value not found.",
      });
    }

    coreValue.status =
      coreValue.status === "Active"
        ? "Inactive"
        : "Active";

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Core Value status updated successfully.",
      data: coreValue,
    });
  } catch (error) {
    console.error("Toggle Core Value Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Core Value status.",
      error: error.message,
    });
  }
};

/* ==========================================================
   REORDER CORE VALUES
========================================================== */

export const reorderCoreValues = async (req, res) => {
  try {
    const { coreValues } = req.body;

    if (!Array.isArray(coreValues)) {
      return res.status(400).json({
        success: false,
        message: "coreValues array is required.",
      });
    }

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    coreValues.forEach((item, index) => {
      const value = missionVision.coreValues.id(item.id);

      if (value) {
        value.order = index + 1;
      }
    });

    missionVision.coreValues.sort((a, b) => a.order - b.order);

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Core Values reordered successfully.",
      data: missionVision.coreValues,
    });
  } catch (error) {
    console.error("Reorder Core Values Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reorder Core Values.",
      error: error.message,
    });
  }
};
/* ==========================================================
   ADD BRAND PILLAR
========================================================== */

export const addBrandPillar = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.brandPillars.push(req.body);

    await missionVision.save();

    return res.status(201).json({
      success: true,
      message: "Brand Pillar added successfully.",
      data: missionVision.brandPillars,
    });
  } catch (error) {
    console.error("Add Brand Pillar Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add Brand Pillar.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE BRAND PILLAR
========================================================== */

export const updateBrandPillar = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const pillar = missionVision.brandPillars.id(id);

    if (!pillar) {
      return res.status(404).json({
        success: false,
        message: "Brand Pillar not found.",
      });
    }

    Object.assign(pillar, req.body);

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Brand Pillar updated successfully.",
      data: pillar,
    });
  } catch (error) {
    console.error("Update Brand Pillar Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Brand Pillar.",
      error: error.message,
    });
  }
};

/* ==========================================================
   DELETE BRAND PILLAR
========================================================== */

export const deleteBrandPillar = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const pillar = missionVision.brandPillars.id(id);

    if (!pillar) {
      return res.status(404).json({
        success: false,
        message: "Brand Pillar not found.",
      });
    }

    pillar.deleteOne();

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Brand Pillar deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Brand Pillar Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Brand Pillar.",
      error: error.message,
    });
  }
};
/* ==========================================================
   TOGGLE BRAND PILLAR STATUS
========================================================== */

export const toggleBrandPillarStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const pillar = missionVision.brandPillars.id(id);

    if (!pillar) {
      return res.status(404).json({
        success: false,
        message: "Brand Pillar not found.",
      });
    }

    pillar.status =
      pillar.status === "Active"
        ? "Inactive"
        : "Active";

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Brand Pillar status updated successfully.",
      data: pillar,
    });
  } catch (error) {
    console.error("Toggle Brand Pillar Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Brand Pillar status.",
      error: error.message,
    });
  }
};

/* ==========================================================
   REORDER BRAND PILLARS
========================================================== */

export const reorderBrandPillars = async (req, res) => {
  try {
    const { brandPillars } = req.body;

    if (!Array.isArray(brandPillars)) {
      return res.status(400).json({
        success: false,
        message: "brandPillars array is required.",
      });
    }

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    brandPillars.forEach((item, index) => {
      const pillar = missionVision.brandPillars.id(item.id);

      if (pillar) {
        pillar.order = index + 1;
      }
    });

    missionVision.brandPillars.sort(
      (a, b) => a.order - b.order
    );

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Brand Pillars reordered successfully.",
      data: missionVision.brandPillars,
    });
  } catch (error) {
    console.error("Reorder Brand Pillars Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reorder Brand Pillars.",
      error: error.message,
    });
  }
};
/* ==========================================================
   ADD ROADMAP
========================================================== */

export const addRoadmap = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.roadmap.push(req.body);

    await missionVision.save();

    return res.status(201).json({
      success: true,
      message: "Roadmap added successfully.",
      data: missionVision.roadmap,
    });
  } catch (error) {
    console.error("Add Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add Roadmap.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE ROADMAP
========================================================== */

export const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const roadmap = missionVision.roadmap.id(id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    Object.assign(roadmap, req.body);

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap updated successfully.",
      data: roadmap,
    });
  } catch (error) {
    console.error("Update Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Roadmap.",
      error: error.message,
    });
  }
};

/* ==========================================================
   DELETE ROADMAP
========================================================== */

export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const roadmap = missionVision.roadmap.id(id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    roadmap.deleteOne();

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Roadmap.",
      error: error.message,
    });
  }
};

/* ==========================================================
   TOGGLE ROADMAP STATUS
========================================================== */

export const toggleRoadmapStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    const roadmap = missionVision.roadmap.id(id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const nextStatus = {
      Planning: "In Progress",
      "In Progress": "Completed",
      Completed: "Upcoming",
      Upcoming: "Planning",
    };

    roadmap.status = nextStatus[roadmap.status];

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap status updated successfully.",
      data: roadmap,
    });
  } catch (error) {
    console.error("Toggle Roadmap Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Roadmap status.",
      error: error.message,
    });
  }
};

/* ==========================================================
   REORDER ROADMAP
========================================================== */

export const reorderRoadmap = async (req, res) => {
  try {
    const { roadmap } = req.body;

    if (!Array.isArray(roadmap)) {
      return res.status(400).json({
        success: false,
        message: "roadmap array is required.",
      });
    }

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    roadmap.forEach((item, index) => {
      const row = missionVision.roadmap.id(item.id);

      if (row) {
        row.order = index + 1;
      }
    });

    missionVision.roadmap.sort((a, b) => a.order - b.order);

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap reordered successfully.",
      data: missionVision.roadmap,
    });
  } catch (error) {
    console.error("Reorder Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reorder Roadmap.",
      error: error.message,
    });
  }
};
/* ==========================================================
   UPDATE CTA
========================================================== */

export const updateCTA = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.cta = {
      ...missionVision.cta.toObject(),
      ...req.body,
    };

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "CTA updated successfully.",
      data: missionVision.cta,
    });
  } catch (error) {
    console.error("Update CTA Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update CTA.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE SEO
========================================================== */

export const updateSEO = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.seo = {
      ...missionVision.seo.toObject(),
      ...req.body,
    };

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "SEO updated successfully.",
      data: missionVision.seo,
    });
  } catch (error) {
    console.error("Update SEO Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update SEO.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UPDATE SECTION SETTINGS
========================================================== */

export const updateSectionSettings = async (req, res) => {
  try {
    const { section } = req.params;

    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    if (!missionVision.sectionSettings[section]) {
      return res.status(400).json({
        success: false,
        message: "Invalid section name.",
      });
    }

    missionVision.sectionSettings[section] = {
      ...missionVision.sectionSettings[section].toObject(),
      ...req.body,
    };

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Section settings updated successfully.",
      data: missionVision.sectionSettings[section],
    });
  } catch (error) {
    console.error("Update Section Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update section settings.",
      error: error.message,
    });
  }
};

/* ==========================================================
   SAVE DRAFT
========================================================== */

export const saveDraft = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.isDraft = true;
    missionVision.isPublished = false;

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Draft saved successfully.",
      data: missionVision,
    });
  } catch (error) {
    console.error("Save Draft Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save draft.",
      error: error.message,
    });
  }
};

/* ==========================================================
   PUBLISH MISSION & VISION
========================================================== */

export const publishMissionVision = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.isPublished = true;
    missionVision.isDraft = false;

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Mission & Vision published successfully.",
      data: missionVision,
    });
  } catch (error) {
    console.error("Publish Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to publish Mission & Vision.",
      error: error.message,
    });
  }
};

/* ==========================================================
   UNPUBLISH MISSION & VISION
========================================================== */

export const unpublishMissionVision = async (req, res) => {
  try {
    const missionVision = await MissionVision.findOne();

    if (!missionVision) {
      return res.status(404).json({
        success: false,
        message: "Mission & Vision not found.",
      });
    }

    missionVision.isPublished = false;
    missionVision.isDraft = true;

    await missionVision.save();

    return res.status(200).json({
      success: true,
      message: "Mission & Vision unpublished successfully.",
      data: missionVision,
    });
  } catch (error) {
    console.error("Unpublish Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to unpublish Mission & Vision.",
      error: error.message,
    });
  }
};
