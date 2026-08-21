const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const protect = require("./middleware/authMiddleware");
const admin = require("./middleware/adminMiddleware");

const notFound = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// ===============================
// Rate Limiting
// ===============================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again later."
  }
});


// ===============================
// Global Middleware
// ===============================

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(generalLimiter);


// ===============================
// API Routes
// ===============================

app.use("/api/auth", authLimiter, authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/reviews", reviewRoutes);


// ===============================
// Protected Route
// ===============================

app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});


// ===============================
// Admin Route
// ===============================

app.get("/api/admin", protect, admin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running"
  });
});


// ===============================
// 404
// ===============================

app.use(notFound);


// ===============================
// Error Handler
// ===============================

app.use(errorMiddleware);


module.exports = app;
