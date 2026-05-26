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

// 🔥 CHECK PROFILE COMPLETION
export const checkProfileCompletion = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const requiredFields = [
      "idNumber",
      "idFront",
      "idBack",
      "cv",
      "certifications",
    ];

    const isComplete = requiredFields.every((field) => {
      if (Array.isArray(user[field])) {
        return user[field].length > 0;
      }
      return !!user[field];
    });

    user.isProfileComplete = isComplete;
    await user.save();

    res.json({ isProfileComplete: isComplete });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
