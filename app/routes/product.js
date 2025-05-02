const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const productController = require("../controllers/productController");

router.post("/create", upload, productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;
