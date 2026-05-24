import Payment from "../models/Payment.js";

export const createPayment =
  async (req, res) => {
    try {
      const {
        booking,
        client,
        worker,
        totalAmount,
      } = req.body;

      // 🔥 25% COMMISSION
      const companyCommission =
        totalAmount * 0.25;

      // 🔥 WORKER GETS 75%
      const workerAmount =
        totalAmount -
        companyCommission;

      const payment =
        await Payment.create({
          booking,
          client,
          worker,
          totalAmount,
          companyCommission,
          workerAmount,
          status: "paid",
        });

      res.status(201).json(
        payment
      );

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  export const getWorkerPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      worker: req.params.workerId,
    }).sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};