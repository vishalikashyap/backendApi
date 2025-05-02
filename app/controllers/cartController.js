const Cart = require("../model/cart");
const Product = require("../model/product");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cartItem = new Cart({
        userId,
        productId,
        name: product.name,
        email: product.email,
        price: product.price,
        phone: product.phone,
        images: product.images,
        quantity: quantity || 1,
      });
    }

    await cartItem.save();
    res.status(201).json({ success: true, message: "Product added to cart!", cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cart items for a specific user
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ success: true, message: "Product removed from cart!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeAllFromCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    await Cart.deleteMany({ userId });
    res.status(200).json({ success: true, message: "All items removed from cart!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
