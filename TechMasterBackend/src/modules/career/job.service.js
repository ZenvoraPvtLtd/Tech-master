import * as JobRepository from "./job.repository.js";

export const createJobService = async (payload) => {
  return await JobRepository.createJobRepository(payload);
};

export const getAllJobService = async () => {
  return await JobRepository.getAllJobRepository();
};

export const getJobByIdService = async (id) => {
  return await JobRepository.getJobByIdRepository(id);
};

export const updateJobService = async (id, payload) => {
  return await JobRepository.updateJobRepository(id, payload);
};

export const deleteJobService = async (id) => {
  return await JobRepository.deleteJobRepository(id);
};

export const getFeaturedJobsService = async () => {
  return await JobRepository.getFeaturedJobsRepository();
};

export const getActiveJobsService = async () => {
  return await JobRepository.getActiveJobsRepository();
};