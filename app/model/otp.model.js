const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  isLocalhost:{type:String,require:false},
  createdAt: { type: Date, default: Date.now, expires: 300 } 
  // expires in 5 minutes
});

module.exports = mongoose.model("Otp", otpSchema);
