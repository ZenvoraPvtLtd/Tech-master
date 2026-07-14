import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;