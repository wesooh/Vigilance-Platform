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

    // =========================
    // 🔐 VERIFICATION CORE
    // =========================
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationStatus: {
      type: String,
      enum: ["incomplete", "pending", "verified"],
      default: "incomplete",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    // =========================
    // 🪪 ID VERIFICATION
    // =========================
    idNumber: {
      type: String,
      default: "",
    },

    idFrontImage: {
      type: String, // URL after upload
      default: "",
    },

    idBackImage: {
      type: String,
      default: "",
    },

    // =========================
    // 📄 WORKER DOCUMENTS
    // =========================
    cv: {
      type: String, // file URL
      default: "",
    },

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

    profileImage: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    skills: [String],

    experience: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    availability: {
      type: Boolean,
      default: true,
    },

    // =========================
    // 💰 PRICING
    // =========================
    price: {
      daily: { type: Number, default: 0 },
      weekly: { type: Number, default: 0 },
      monthly: { type: Number, default: 0 },
    },

    // =========================
    // ⭐ SOCIAL PROOF
    // =========================
    rating: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: String,
        comment: String,
      },
    ],

    testimonials: [
      {
        clientName: String,
        comment: String,
      },
    ],

    // =========================
    // 🔐 OTP SUPPORT (FOR NEXT STEP)
    // =========================
    otpCode: {
      type: String,
      default: null,
    },

    otpExpiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);