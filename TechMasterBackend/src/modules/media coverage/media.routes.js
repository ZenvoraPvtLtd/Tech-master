import express from "express";
import upload from "../../middleware/upload.middleware.js";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "./media.controller.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  create
);

router.get("/", getAll);

router.get("/:id", getById);

router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  update
);

router.delete("/:id", remove);

export default router;