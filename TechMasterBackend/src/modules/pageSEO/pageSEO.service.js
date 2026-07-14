import * as PageSEORepository from "./pageSEO.repository.js";

export const createPageSEOService = async (data) => {
  return await PageSEORepository.createPageSEORepository(data);
};

export const getAllPageSEOService = async () => {
  return await PageSEORepository.getAllPageSEORepository();
};

export const getPageSEOByIdService = async (id) => {
  return await PageSEORepository.getPageSEOByIdRepository(id);
};

export const updatePageSEOService = async (id, data) => {
  return await PageSEORepository.updatePageSEORepository(id, data);
};

export const deletePageSEOService = async (id) => {
  return await PageSEORepository.deletePageSEORepository(id);
};