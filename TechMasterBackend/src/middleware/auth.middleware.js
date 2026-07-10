import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Token Missing.",
      });
    }

    const parts = authHeader.trim().split(/\s+/);

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Format",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;
    req.user = decoded; // Support both req.admin and req.user key references

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;


