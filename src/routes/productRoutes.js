const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin only
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
