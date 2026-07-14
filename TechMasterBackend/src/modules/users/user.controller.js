import { createCrud } from "../../common/crud.factory.js";
import { successResponse } from "../../utils/response.js";

import User from "./user.model.js";
import { toggleUserStatusService } from "./user.service.js";

export const {
  create: createUser,
  getAll: getAllUsers,
  getById: getUserById,
  update: updateUser,
  delete: deleteUser,
} = createCrud({
  Model: User,

  messages: {
    create: "User created successfully",
    getAll: "Users fetched successfully",
    getById: "User fetched successfully",
    update: "User updated successfully",
    delete: "User deleted successfully",
  },
});

export const toggleUserStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const data = await toggleUserStatusService(
      req.params.id,
      status
    );

    return successResponse(
      res,
      "User status updated successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};