import Testimonial from "./testimonial.model.js";

import { createCrud } from "../../common/crud.factory.js";


// ==========================
// Common CRUD
// ==========================

export const {
  create,
  getAll,
  getById,
  update,
  delete: remove,
} = createCrud({

  Model: Testimonial,


  uploadFields: {

    avatarUrl: {
      folder: "testimonials/images",
    },

    video: {
      folder: "testimonials/videos",
    },

  },


  messages: {

    create:
      "Testimonial created successfully",

    getAll:
      "Testimonials fetched successfully",

    getById:
      "Testimonial fetched successfully",

    update:
      "Testimonial updated successfully",

    delete:
      "Testimonial deleted successfully",

  },

});