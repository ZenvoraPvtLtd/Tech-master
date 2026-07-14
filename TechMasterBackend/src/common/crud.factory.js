import * as CrudController from "./crud.controller.js";

export const createCrud = ({
  Model,
  uploadFields = {},
  filter = {},
  sort = { createdAt: -1 },
  messages = {},
}) => {
  return {
    create: (req, res, next) =>
      CrudController.create(
        req,
        res,
        next,
        Model,
        uploadFields,
        messages.create
      ),

    getAll: (req, res, next) =>
      CrudController.getAll(
        req,
        res,
        next,
        Model,
        filter,
        sort,
        messages.getAll
      ),

    getById: (req, res, next) =>
      CrudController.getById(
        req,
        res,
        next,
        Model,
        messages.getById
      ),

    update: (req, res, next) =>
      CrudController.update(
        req,
        res,
        next,
        Model,
        uploadFields,
        messages.update
      ),

    delete: (req, res, next) =>
      CrudController.remove(
        req,
        res,
        next,
        Model,
        messages.delete
      ),
  };
};