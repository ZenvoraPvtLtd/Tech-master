import {
  updateUserStatusRepository,
} from "./user.repository.js";

export const toggleUserStatusService = async (
  id,
  status
) => {
  return await updateUserStatusRepository(
    id,
    status
  );
};