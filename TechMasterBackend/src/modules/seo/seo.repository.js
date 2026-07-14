import SEO from "./seo.model.js";

// Get SEO Settings
export const getSEORepository = async () => {
  let seo = await SEO.findOne();

  if (!seo) {
    seo = await SEO.create({});
  }

  return seo;
};

// Update SEO Settings
export const updateSEORepository = async (data) => {
  let seo = await SEO.findOne();

  if (!seo) {
    seo = await SEO.create(data);
  } else {
    Object.assign(seo, data);
    await seo.save();
  }

  return seo;
};