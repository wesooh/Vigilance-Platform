import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

// 🔥 ADMIN FINANCIAL OVERVIEW
export const getAdminStats = async (req, res) => {
  try {
    // all payments
    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.companyCommission,
      0
    );

    const totalPayouts = payments.reduce(
      (sum, p) => sum + p.workerAmount,
      0
    );

    const totalPaid = payments.length;

    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    // top earners
    const workers = await Payment.aggregate([
      {
        $group: {
          _id: "$worker",
          earnings: { $sum: "$workerAmount" },
        },
      },
      { $sort: { earnings: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalRevenue,
      totalPayouts,
      totalPaid,
      completedBookings,
      topWorkers: workers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};