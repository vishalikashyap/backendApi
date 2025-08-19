const express = require("express");
const nodemailer = require("nodemailer");
const Otp = require("../model/otp.model"); // import OTP model
const router = express.Router();
const path = require("path");
// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "help.grabsy@gmail.com",       // replace with your email
    pass: "jejn ahpl rqvh omld"          // use Gmail App Password
  }
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email ,isLocalhost } = req.body;

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save in DB
    await Otp.create({ email, otp ,isLocalhost });

await transporter.sendMail({
  from: '"Grabsy" <help.grabsy@gmail.com>',
  to: email,
  subject: " Your OTP Code - Grabsy App",
  html: `
  <div style="font-family: Arial, sans-serif; padding: 40px; background: linear-gradient(135deg, #f9fafb, #eef2f7); color: #333;">
    <div style="max-width: 550px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: #eab308; padding: 25px; text-align: center;">
        <img src="cid:grabsylogo" alt="Grabsy Logo" style="width:80px; display:block; margin:auto;" />
        <h1 style="color: #fff; margin: 15px 0 0; font-size: 22px;">Email Verification</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px; margin-bottom: 15px; color:#444;">
          Hello 👋,
        </p>
        <p style="font-size: 15px; margin-bottom: 25px; line-height: 1.6; color:#555;">
          Use the following <b style="color:#eab308;">One-Time Password (OTP)</b> to complete your verification.  
          This code is valid for <b>5 minutes</b>.
        </p>
        
        <!-- OTP Code -->
        <div style="font-size: 36px; font-weight: bold; background: #fef9c3; color: #b45309; padding: 15px 25px; border-radius: 8px; display: inline-block; letter-spacing: 6px; box-shadow: inset 0 0 8px rgba(234,179,8,0.4);">
          ${otp}
        </div>
        
        <!-- Call to Action -->
        <p style="margin-top: 30px; font-size: 15px; color: #444;">
          If you didn’t request this code, you can safely ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style=" text-align: center; padding: 20px; font-size: 12px; color: #999;">
        <p>© ${new Date().getFullYear()} <b>Grabsy App</b>. All rights reserved.</p>
      </div>
    </div>
  </div>
  `,
  attachments: [
    {
      filename: "logo.png",
      path: path.join(__dirname, "..","..", "public", "logo.png"),
      cid: "grabsylogo"
    }
  ]
});


    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP is valid → delete it so it can't be reused
    await Otp.deleteMany({ email });

    res.json({ success: true, message: "OTP verified!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

module.exports = router;
