const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  id: String,
  name: String,
  addressLine: String,
  landmark: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String,  enum: ["user", "admin"], default: "user"
  }, addresses: [addressSchema],
});

module.exports = mongoose.model('User', userSchema);
