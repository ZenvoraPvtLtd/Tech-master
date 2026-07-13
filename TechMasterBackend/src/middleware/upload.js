import multer from "multer";

// Use memory storage so req.file.buffer is available to upload directly to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB maximum limit
  },
});

export default upload;
