import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "./user.controller.js";

const validate = () => (req, res, next) => next();
const router = express.Router();

router.post("/create", createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.patch("/:id/status", toggleUserStatus);

export default router;