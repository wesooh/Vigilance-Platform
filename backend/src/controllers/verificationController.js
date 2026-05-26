import User from "../models/User.js";

// CHECK PROFILE COMPLETION
export const checkProfileCompletion = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      isComplete: user.isProfileComplete,
      otpVerified: user.otpVerified,
      status: user.verificationStatus,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEND OTP (TERMINAL ONLY)
export const sendOTP = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otpCode = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    user.otpVerified = false;

    await user.save();

    console.log("🔥 OTP GENERATED:", otp);

    res.json({
      message: "OTP sent (check terminal)",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VERIFY OTP + COMPLETE PROFILE
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isProfileComplete = true;
    user.otpVerified = true;
    user.verificationStatus = "pending";

    user.otpCode = null;
    user.otpExpiresAt = null;

    await user.save();

    res.json({
      message: "Verification successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};