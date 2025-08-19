const Wishlist = require("../model/wishlist");
const Product = require("../model/product");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userEmail, productId } = req.body;

    if (!userEmail || !productId) {
      return res.status(400).json({ success: false, message: "userEmail and productId are required" });
    }

    // Check if already added
    const exists = await Wishlist.findOne({ userEmail, productId });
    if (exists) {
      return res.status(200).json({ success: true, message: "Already in wishlist" });
    }

    const entry = new Wishlist({ userEmail, productId });
    await entry.save();

    res.status(201).json({ success: true, message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get wishlist products by user
exports.getWishlistByUser = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "userEmail is required" });
    }

    const wishlist = await Wishlist.find({ userEmail }).populate("productId");

    const products = wishlist.map(item => item.productId);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { userEmail, productId } = req.query;

    if (!userEmail || !productId) {
      return res.status(400).json({ success: false, message: "userEmail and productId are required" });
    }

    const result = await Wishlist.findOneAndDelete({ userEmail, productId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Wishlist entry not found" });
    }

    res.status(200).json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
