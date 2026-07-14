import {
  createFAQRepository,
  getAllFAQRepository,
  getFAQByIdRepository,
  updateFAQRepository,
  deleteFAQRepository,
  createEnquiryRepository,
  getAllEnquiryRepository,
  getEnquiryByIdRepository,
  replyEnquiryRepository,
  deleteEnquiryRepository,
} from "./faq.repository.js";

import {
  createFAQValidation,
  updateFAQValidation,
  createEnquiryValidation,
  replyEnquiryValidation,
} from "./faq.validation.js";

// ==============================
// FAQ Services
// ==============================

// Create FAQ
export const createFAQService = async (payload) => {
  const { error, value } = createFAQValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  return await createFAQRepository(value);
};

// Get All FAQs
export const getAllFAQService = async () => {
  return await getAllFAQRepository();
};

// Get FAQ By ID
export const getFAQByIdService = async (id) => {
  const faq = await getFAQByIdRepository(id);

  if (!faq) throw new Error("FAQ not found");

  return faq;
};

// Update FAQ
export const updateFAQService = async (id, payload) => {
  const { error, value } = updateFAQValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  const faq = await updateFAQRepository(id, value);

  if (!faq) throw new Error("FAQ not found");

  return faq;
};

// Delete FAQ
export const deleteFAQService = async (id) => {
  const faq = await deleteFAQRepository(id);

  if (!faq) throw new Error("FAQ not found");

  return faq;
};

// ==============================
// Enquiry Services
// ==============================

// Create Enquiry
export const createEnquiryService = async (payload) => {
  const { error, value } = createEnquiryValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  return await createEnquiryRepository(value);
};

// Get All Enquiries
export const getAllEnquiryService = async () => {
  return await getAllEnquiryRepository();
};

// Get Enquiry By ID
export const getEnquiryByIdService = async (id) => {
  const enquiry = await getEnquiryByIdRepository(id);

  if (!enquiry) throw new Error("Enquiry not found");

  return enquiry;
};

// Reply Enquiry
export const replyEnquiryService = async (id, payload) => {
  const { error, value } = replyEnquiryValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  const enquiry = await replyEnquiryRepository(id, value.reply);

  if (!enquiry) throw new Error("Enquiry not found");

  return enquiry;
};

// Delete Enquiry
export const deleteEnquiryService = async (id) => {
  const enquiry = await deleteEnquiryRepository(id);

  if (!enquiry) throw new Error("Enquiry not found");

  return enquiry;
};