import * as RedirectRepository from "./redirect.repository.js";

export const createRedirect = async (data) => {
  return await RedirectRepository.createRedirect(data);
};

export const getAllRedirects = async () => {
  return await RedirectRepository.getAllRedirects();
};

export const getRedirectById = async (id) => {
  return await RedirectRepository.getRedirectById(id);
};

export const updateRedirect = async (id, data) => {
  return await RedirectRepository.updateRedirect(id, data);
};

export const deleteRedirect = async (id) => {
  return await RedirectRepository.deleteRedirect(id);
};