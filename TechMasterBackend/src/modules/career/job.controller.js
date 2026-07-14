import { createCrud } from "../../common/crud.factory.js";
import * as CrudController from "../../common/crud.controller.js";
import Job from "./job.model.js";

export const {
  create: createJob,
  getAll: getAllJobs,
  getById: getJobById,
  update: updateJob,
  delete: deleteJob,
} = createCrud({
  Model: Job,

  uploadFields: {
    companyLogo: {
      folder: "career/company-logo",
      multiple: false,
    },
  },

  messages: {
    create: "Job created successfully",
    getAll: "Jobs fetched successfully",
    getById: "Job fetched successfully",
    update: "Job updated successfully",
    delete: "Job deleted successfully",
  },
});

export const getFeaturedJobs = async (req, res, next) => {
  return CrudController.find(
    req,
    res,
    next,
    Job,
    {
      featured: true,
      active: true,
    },
    "Featured jobs fetched successfully"
  );
};

export const getActiveJobs = async (req, res, next) => {
  return CrudController.find(
    req,
    res,
    next,
    Job,
    {
      active: true,
    },
    "Active jobs fetched successfully"
  );
};