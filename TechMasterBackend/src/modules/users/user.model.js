import mongoose from "mongoose";

const userSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;