import * as ResumeRepository from "./resume.repository.js";

export const createResumeService = async (payload) => {
  return await ResumeRepository.createResumeRepository(payload);
};

export const getAllResumeService = async () => {
  return await ResumeRepository.getAllResumeRepository();
};

export const getResumeByIdService = async (id) => {
  return await ResumeRepository.getResumeByIdRepository(id);
};

export const updateResumeService = async (id, payload) => {
  return await ResumeRepository.updateResumeRepository(id, payload);
};

export const deleteResumeService = async (id) => {
  return await ResumeRepository.deleteResumeRepository(id);
};

export const getPendingResumeService = async () => {
  return await ResumeRepository.getPendingResumeRepository();
};

export const getShortlistedResumeService = async () => {
  return await ResumeRepository.getShortlistedResumeRepository();
};