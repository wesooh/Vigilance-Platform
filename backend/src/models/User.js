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

    // Worker-specific fields
    isVerified: {
      type: Boolean,
      default: false,
    },

    skills: [String],

    experience: String,

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

    price: {
      daily: Number,
      weekly: Number,
      monthly: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);