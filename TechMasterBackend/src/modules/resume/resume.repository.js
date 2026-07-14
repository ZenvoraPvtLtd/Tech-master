import Resume from "./resume.model.js";

export const createResumeRepository = async (payload) => {
  return await Resume.create(payload);
};

export const getAllResumeRepository = async () => {
  return await Resume.find()
    .populate("job", "title department location")
    .sort({ createdAt: -1 });
};

export const getResumeByIdRepository = async (id) => {
  return await Resume.findById(id).populate(
    "job",
    "title department location"
  );
};

export const updateResumeRepository = async (id, payload) => {
  return await Resume.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteResumeRepository = async (id) => {
  return await Resume.findByIdAndDelete(id);
};

export const getPendingResumeRepository = async () => {
  return await Resume.find({
    status: "Pending",
  })
    .populate("job", "title department")
    .sort({ createdAt: -1 });
};

export const getShortlistedResumeRepository = async () => {
  return await Resume.find({
    status: "Shortlisted",
  })
    .populate("job", "title department")
    .sort({ createdAt: -1 });
};