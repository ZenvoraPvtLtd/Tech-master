
import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  console.log("JWT_SECRET =", process.env.JWT_SECRET);

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export default generateToken;





















