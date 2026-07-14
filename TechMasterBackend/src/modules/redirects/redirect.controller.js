import Redirect from "./redirect.model.js";
import { createCrud } from "../../common/crud.factory.js";

const uploadFields = {};

const messages = {
  create: "Redirect created successfully",
  getAll: "Redirects fetched successfully",
  getById: "Redirect fetched successfully",
  update: "Redirect updated successfully",
  delete: "Redirect deleted successfully",
};

const crud = createCrud({
  Model: Redirect,
  uploadFields,
  messages,
});

export const createRedirect = crud.create;
export const getAllRedirects = crud.getAll;
export const getRedirectById = crud.getById;
export const updateRedirect = crud.update;
export const deleteRedirect = crud.delete;