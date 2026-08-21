const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get Cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add Product To Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (!product.isActive) {
      return res.status(400).json({
        success: false,
        message: "Product is not available"
      });
    }

    const requestedQuantity = Number(quantity);

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    if (requestedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available"
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + requestedQuantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Requested quantity exceeds available stock"
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: requestedQuantity
      });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const requestedQuantity = Number(quantity);

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (requestedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available"
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart"
      });
    }

    item.quantity = requestedQuantity;

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove Product From Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart"
      });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
