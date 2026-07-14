import { createCrud } from "../../common/crud.factory.js";
import FAQ from "./faq.model.js";

import {
  createEnquiryService,
  getAllEnquiryService,
  getEnquiryByIdService,
  replyEnquiryService,
  deleteEnquiryService,
} from "./faq.service.js";

import { successResponse } from "../../utils/response.js";

// ==============================
// FAQ CRUD CONTROLLER
// ==============================

export const {
  create: createFAQ,
  getAll: getAllFAQs,
  getById: getFAQById,
  update: updateFAQ,
  delete: deleteFAQ,
} = createCrud({
  Model: FAQ,

  messages: {
    create: "FAQ created successfully",

    getAll: "FAQs fetched successfully",

    getById: "FAQ fetched successfully",

    update: "FAQ updated successfully",

    delete: "FAQ deleted successfully",
  },
});

// ==============================
// Enquiry Controller
// ==============================

// Create Enquiry
export const createEnquiry = async (req, res, next) => {
  try {
    const data = await createEnquiryService(req.body);

    return successResponse(
      res,
      "Enquiry created successfully",
      data,
      201
    );
  } catch (error) {
    next(error);
  }
};

// Get All Enquiries
export const getAllEnquiries = async (req, res, next) => {
  try {
    const data = await getAllEnquiryService();

    return successResponse(
      res,
      "Enquiries fetched successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

// Get Enquiry By ID
export const getEnquiryById = async (req, res, next) => {
  try {
    const data = await getEnquiryByIdService(req.params.id);

    return successResponse(
      res,
      "Enquiry fetched successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

// Reply Enquiry
export const replyEnquiry = async (req, res, next) => {
  try {
    const data = await replyEnquiryService(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      "Reply sent successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

// Delete Enquiry
export const deleteEnquiry = async (req, res, next) => {
  try {
    await deleteEnquiryService(req.params.id);

    return successResponse(
      res,
      "Enquiry deleted successfully",
      null
    );
  } catch (error) {
    next(error);
  }
};