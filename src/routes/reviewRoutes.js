const express = require("express");

const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  adminDeleteReview
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Get reviews for product
router.get("/product/:productId", getProductReviews);

// Create review
router.post("/product/:productId", protect, createReview);

// Update own review
router.put(
  "/product/:productId/:reviewId",
  protect,
  updateReview
);

// Delete own review
router.delete(
  "/product/:productId/:reviewId",
  protect,
  deleteReview
);

// Admin delete review
router.delete(
  "/admin/:reviewId",
  protect,
  admin,
  adminDeleteReview
);

module.exports = router;
