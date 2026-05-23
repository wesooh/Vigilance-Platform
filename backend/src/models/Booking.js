import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema(
    {
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      serviceType: {
        type: String,
        default: "",
      },

      message: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
          "completed",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;