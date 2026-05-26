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
    category: {
      type: String,
      default: "",
    },
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

rating: {
  type: Number,
  default: 0,
},

availability: {
  type: Boolean,
  default: true,
},

price: {
  daily: {
    type: Number,
    default: 0,
  },

  weekly: {
    type: Number,
    default: 0,
  },

  monthly: {
    type: Number,
    default: 0,
  },

  verificationStatus: {
  type: String,
  enum: ["incomplete", "pending", "verified"],
  default: "incomplete",
},

idNumber: {
  type: String,
  default: "",
},

idFront: {
  type: String,
  default: "",
},

idBack: {
  type: String,
  default: "",
},

cv: {
  type: String,
  default: "",
},

certifications: {
  type: [String],
  default: [],
},

areaOfWork: {
  type: String,
  default: "",
},

otpCode: String,
otpExpires: Date,
},

testimonials: [
  {
    clientName: String,
    comment: String,
  },
],  
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);