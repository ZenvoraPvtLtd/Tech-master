import User from "./user.model.js";

export const createUserRepository = async (payload) => {
  return await User.create(payload);
};

export const getAllUserRepository = async () => {
  return await User.find().sort({ createdAt: -1 });
};

export const getUserByIdRepository = async (id) => {
  return await User.findById(id);
};

export const updateUserRepository = async (id, payload) => {
  return await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserRepository = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const updateUserStatusRepository = async (
  id,
  status
) => {
  return await User.findByIdAndUpdate(
    id,
    {
      status,
      lastActive: new Date(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
};