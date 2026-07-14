import express from "express";
import * as contactController from "./contact.controller.js";

const router = express.Router();

// Dummy validate middleware to bypass Joi validation globally in this route
const validate = (schema) => (req, res, next) => {
    return next();
};

// No authMiddleware because it's bypassed globally as requested.
router.route("/")
    .get(contactController.getContacts)
    .post(validate(), contactController.createContact);

router.route("/:id")
    .get(contactController.getContactById)
    .put(validate(), contactController.updateContact)
    .delete(contactController.deleteContact);

export default router;
