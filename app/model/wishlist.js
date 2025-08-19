
const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userEmail: { type : String, required:true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    addedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Wishlist", wishlistSchema);
