import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "./testimonial.repository.js";

// Create
export const createTestimonialService = async (data) => {
  return await createTestimonial(data);
};

// Get All
export const getAllTestimonialsService = async () => {
  return await getAllTestimonials();
};

// Get By ID
export const getTestimonialByIdService = async (id) => {
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    throw new Error("Testimonial not found");
  }

  return testimonial;
};

// Update
export const updateTestimonialService = async (id, data) => {
  const testimonial = await updateTestimonial(id, data);

  if (!testimonial) {
    throw new Error("Testimonial not found");
  }

  return testimonial;
};

// Delete
export const deleteTestimonialService = async (id) => {
  const testimonial = await deleteTestimonial(id);

  if (!testimonial) {
    throw new Error("Testimonial not found");
  }

  return testimonial;
};