const Product = require("../model/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, email, price, phone, category } = req.body;

    if (!name || !email || !price || !phone || !category || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields including category and at least one image are required!",
      });
    }

    // Extract image paths
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    // Create new product document
    const product = new Product({
      name,
      email,
      price,
      phone,
      category, // <-- include this
      images: imagePaths,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products (with optional category filtering)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

