import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import routes from "./src/routes/index.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configured with Dynamic Allowed Origins for Local Development
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ✅ Helmet configured to not block local cross-origin data
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Compression
app.use(compression());

// Cookie Parser
app.use(cookieParser());

// Logger
app.use(loggerMiddleware);

// API Routes
app.use("/api/v1", routes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Backend is Running...",
  });
});

app.use(errorMiddleware);

export default app;
