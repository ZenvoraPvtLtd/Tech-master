import Testimonial from "./testimonial.model.js";

// Create Testimonial
export const createTestimonial = async (data) => {
  return await Testimonial.create(data);
};

// Get All Testimonials
export const getAllTestimonials = async () => {
  return await Testimonial.find().sort({ createdAt: -1 });
};

// Get Testimonial By ID
export const getTestimonialById = async (id) => {
  return await Testimonial.findById(id);
};

// Update Testimonial
export const updateTestimonial = async (id, data) => {
  return await Testimonial.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Testimonial
export const deleteTestimonial = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};