import User from "../models/User.js";
import { generateOTP } from "../utils/generateOTP.js";

// 1. START VERIFICATION (send OTP)
export const startVerification = async (req, res) => {
  try {
    const {
      userId,
      idNumber,
      areaOfWork,
    } = req.body;

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verification = {
      ...user.verification,
      idNumber,
      areaOfWork,
      otp,
      otpExpires,
    };

    await user.save();

    // TODO: replace with SMS/Email later
    console.log("🔥 OTP SENT:", otp);

    res.json({
      message: "OTP sent successfully",
      otpForTesting: otp, // REMOVE in production
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.verification?.otp) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (user.verification.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.verification.otpExpires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.verification.isVerified = true;
    user.verification.otp = null;
    user.verification.otpExpires = null;

    await user.save();

    res.json({
      message: "Worker verified successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};