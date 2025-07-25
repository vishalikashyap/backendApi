const Product = require("../model/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, email, price, phone, category, description, shortDescription, discount } = req.body;

    if (!name || !email || !price || !phone || !category || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required!",
      });
    }

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const product = new Product({
      name,
      email,
      price,
      phone,
      category,
      images: imagePaths,
      description,
      shortDescription,
      discount: discount || 0,
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

// Get Products (optional filtering by category or search)
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