import Payment from "../models/Payment.js";

// ==============================
// ADMIN FINANCE SUMMARY
// ==============================
export const getFinanceSummary = async (req, res) => {
  try {
    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.totalAmount,
      0
    );

    const totalCommission = payments.reduce(
      (sum, p) => sum + p.companyCommission,
      0
    );

    const totalWorkerEarnings = payments.reduce(
      (sum, p) => sum + p.workerAmount,
      0
    );

    const totalPayments = payments.length;

    res.json({
      totalRevenue,
      totalCommission,
      totalWorkerEarnings,
      totalPayments,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// GET ALL PAYMENTS (ADMIN VIEW)
// ==============================
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("worker", "firstName lastName")
      .populate("client", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};