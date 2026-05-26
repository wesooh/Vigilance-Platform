import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,

    role: {
      type: String,
      enum: ["client", "worker", "admin"],
      default: "client",
    },

    location: String,

    // ======================
    // VERIFICATION CORE
    // ======================
    isVerified: {
      type: Boolean,
      default: false,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    verificationStatus: {
      type: String,
      enum: ["incomplete", "pending", "verified"],
      default: "incomplete",
    },

    // ======================
    // ID INFO
    // ======================
    idNumber: String,
    idFrontImage: String,
    idBackImage: String,

    // ======================
    // WORKER DOCS
    // ======================
    cv: String,

    certifications: [
      {
        name: String,
        fileUrl: String,
      },
    ],

    portfolio: [
      {
        title: String,
        fileUrl: String,
      },
    ],

    profileImage: String,
    areaOfWork: String,
    skills: [String],
    experience: String,
    category: String,

    availability: {
      type: Boolean,
      default: true,
    },

    // ======================
    // OTP SYSTEM (CLEAN)
    // ======================
    otpCode: String,
    otpExpiresAt: Date,
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);