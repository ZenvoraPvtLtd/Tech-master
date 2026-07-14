import FAQ, { Enquiry } from "./faq.model.js";

export const createFAQRepository = async (payload) => {
  return await FAQ.create(payload);
};

export const getAllFAQRepository = async () => {
  return await FAQ.find().sort({ createdAt: -1 });
};

export const getFAQByIdRepository = async (id) => {
  return await FAQ.findById(id);
};

export const updateFAQRepository = async (id, payload) => {
  return await FAQ.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteFAQRepository = async (id) => {
  return await FAQ.findByIdAndDelete(id);
};

export const createEnquiryRepository = async (payload) => {
  return await Enquiry.create(payload);
};

export const getAllEnquiryRepository = async () => {
  return await Enquiry.find().sort({ createdAt: -1 });
};

export const getEnquiryByIdRepository = async (id) => {
  return await Enquiry.findById(id);
};

export const replyEnquiryRepository = async (id, payload) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    {
      ...payload,
      status: "Replied",
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteEnquiryRepository = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};