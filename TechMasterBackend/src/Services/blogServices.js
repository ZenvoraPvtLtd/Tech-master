import axios from "axios";

// Assuming base URL is defined somewhere, adjust as needed. 
// Standard setup using an interceptor or basic URL.
const API_URL = "/api/v1/blogs"; 

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, data: [] };
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return { success: false, data: null };
  }
};

export const createBlog = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, message: "Error creating blog" };
  }
};

export const updateBlog = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error);
    return { success: false, message: "Error updating blog" };
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    return { success: false, message: "Error deleting blog" };
  }
};
