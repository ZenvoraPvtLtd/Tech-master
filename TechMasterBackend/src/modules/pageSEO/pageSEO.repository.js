import PageSEO from "./pageSEO.model.js";

export const createPageSEORepository = (data) => {
  return PageSEO.create(data);
};

export const getAllPageSEORepository = () => {
  return PageSEO.find().sort({ createdAt: -1 });
};

export const getPageSEOByIdRepository = (id) => {
  return PageSEO.findById(id);
};

export const updatePageSEORepository = (id, data) => {
  return PageSEO.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deletePageSEORepository = (id) => {
  return PageSEO.findByIdAndDelete(id);
};