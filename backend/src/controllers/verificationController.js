import User from "../models/User.js";
import { generateOTP } from "../utils/generateOTP.js";

// 1. START VERIFICATION (send OTP)
export const startVerification = async (req, res) => {
  try {
    const { userId, idNumber, areaOfWork } = req.body;

    // Fixed the broken assignment line to call the utility cleanly
    const otp = typeof generateOTP === "function" 
      ? generateOTP() 
      : Math.floor(100000 + Math.random() * 900000).toString();
      
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

    console.log("🔥 OTP SENT:", otp);

    res.json({
      message: "OTP sent successfully",
      otpForTesting: otp, // REMOVE in production
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestVerification = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = typeof generateOTP === "function" 
      ? generateOTP() 
      : Math.floor(100000 + Math.random() * 900000).toString();

    user.verification.otpCode = otp;
    user.verification.otpVerified = false;

    await user.save();

    console.log("🔥 OTP FOR USER:", user.email, "CODE:", otp);

    res.json({ message: "OTP sent (check terminal)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STEP 2: VERIFY OTP + SAVE PROFILE
export const verifyWorkerProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { otp, data } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verification.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.verification = {
      ...user.verification,
      ...data,
      isComplete: true,
      otpVerified: true,
    };

    await user.save();

    res.json({ message: "Profile verified successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADDED ALIAS EXPORT TO FIX THE ROUTE SYNTAX ERROR
export const checkVerification = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json({
      isComplete: user.verification?.isComplete || false,
      otpVerified: user.verification?.otpVerified || false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Maps old route name to new logic so verificationRoutes.js stops crashing
export const checkProfileCompletion = checkVerification;

// 🔥 GENERATE OTP (console only)
export const sendOTP = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationOTP = otp;
    user.verificationExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("🔥 OTP FOR VERIFICATION:", otp);

    res.json({ message: "OTP sent (check server console)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.verificationExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.verificationOTP = null;
    user.verificationExpires = null;

    await user.save();

    res.json({ message: "Verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
