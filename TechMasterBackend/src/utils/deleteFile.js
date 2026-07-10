import cloudinary from "../config/cloudinary.js";

const deleteFile = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default deleteFile;