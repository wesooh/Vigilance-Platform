import Booking from "../models/Booking.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    const populated = await booking.populate([
      { path: "client", select: "firstName lastName" },
      { path: "worker", select: "firstName lastName" },
    ]);

    res.status(201).json(populated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET WORKER BOOKINGS
export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      worker: req.params.workerId,
    })
      .populate("client", "firstName lastName")
      .populate("worker", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE BOOKING STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "requested",
      "accepted",
      "in-progress",
      "completed",
      "rejected",
      "cancelled",
      "paid",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("client", "firstName lastName")
      .populate("worker", "firstName lastName");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// NOTIFICATIONS (basic version)
export const getNotifications = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [
        { client: req.params.userId },
        { worker: req.params.userId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};