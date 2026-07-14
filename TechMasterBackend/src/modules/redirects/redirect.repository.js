import Redirect from "./redirect.model.js";

export const createRedirect = async (data) => {
  return await Redirect.create(data);
};

export const getAllRedirects = async () => {
  return await Redirect.find().sort({ createdAt: -1 });
};

export const getRedirectById = async (id) => {
  return await Redirect.findById(id);
};

export const updateRedirect = async (id, data) => {
  return await Redirect.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteRedirect = async (id) => {
  return await Redirect.findByIdAndDelete(id);
};