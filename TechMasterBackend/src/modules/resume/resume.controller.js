import { createCrud } from "../../common/crud.factory.js";
import * as CrudController from "../../common/crud.controller.js";
import Resume from "./resume.model.js";

export const {
  create: createResume,
  getAll: getAllResume,
  getById: getResumeById,
  update: updateResume,
  delete: deleteResume,
} = createCrud({
  Model: Resume,

  uploadFields: {
    resume: {
      folder: "career/resume",
      multiple: false,
    },

    backgroundImage: {
      folder: "career/images",
      multiple: false,
    },

    backgroundVideo: {
      folder: "career/videos",
      multiple: false,
    },
  },

  messages: {
    create: "Resume submitted successfully",
    getAll: "Resumes fetched successfully",
    getById: "Resume fetched successfully",
    update: "Resume updated successfully",
    delete: "Resume deleted successfully",
  },
});

export const getPendingResume = async (req, res, next) => {
  return CrudController.find(
    req,
    res,
    next,
    Resume,
    { status: "Pending" },
    "Pending resumes fetched successfully"
  );
};

export const getShortlistedResume = async (req, res, next) => {
  return CrudController.find(
    req,
    res,
    next,
    Resume,
    { status: "Shortlisted" },
    "Shortlisted resumes fetched successfully"
  );
};