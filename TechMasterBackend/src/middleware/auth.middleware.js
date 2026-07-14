import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Bypass authentication for local testing
  req.admin = { id: "admin" };
  next();
};

export default authMiddleware;


