const express = require("express");

const {
  createOrder,
  getUserOrders,
  getUserOrder,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Create Order
router.post("/", protect, createOrder);

// Admin - Get All Orders
router.get("/admin", protect, admin, getAllOrders);

// User - Get Own Orders
router.get("/", protect, getUserOrders);

// User - Get Single Order
router.get("/:id", protect, getUserOrder);

// Admin - Update Order Status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
