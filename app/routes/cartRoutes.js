const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getUserCart); 
router.delete("/:cartId", cartController.removeFromCart);
router.delete('/removeAll/:userId', cartController.removeAllFromCart);

module.exports = router;
