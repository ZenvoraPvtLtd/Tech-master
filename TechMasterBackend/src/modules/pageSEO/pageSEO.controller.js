import { createCrud } from "../../common/crud.factory.js";

import PageSEO from "./pageSEO.model.js";

const pageSEOController = createCrud({
  Model: PageSEO,

  uploadFields: {},

  filter: {},

  sort: { createdAt: -1 },

  messages: {
    create: "Page SEO created successfully",
    update: "Page SEO updated successfully",
    delete: "Page SEO deleted successfully",
  },
});

export const {
  create: createPageSEO,
  getAll: getAllPageSEO,
  getById: getPageSEOById,
  update: updatePageSEO,
  delete: deletePageSEO,
} = pageSEOController;