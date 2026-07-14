import express from "express";

export const createCrudRoutes = (
  controller
) => {
  const router = express.Router();

  router.post(
    "/create",
    controller.create
  );

  router.get(
    "/",
    controller.getAll
  );

  router.get(
    "/:id",
    controller.getById
  );

  router.put(
    "/:id",
    controller.update
  );

  router.delete(
    "/:id",
    controller.delete
  );

  return router;
};