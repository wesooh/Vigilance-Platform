import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema(
    {
      booking: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: false,
      },

      client: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      worker: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      totalAmount: Number,

      companyCommission:
        Number,

      workerAmount: Number,

      status: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "pending",
      },

     status: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "paid",
      },

    },
    { timestamps: true }
  );

export default mongoose.model(
  "Payment",
  paymentSchema
);