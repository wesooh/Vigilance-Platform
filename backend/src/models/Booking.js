import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "in-progress",
        "completed",
        "rejected",
        "cancelled",
        "paid",
      ],
      default: "requested",
    },

    price: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid"],
      default: "unpaid",
    },

    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);