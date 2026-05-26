import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js";

// ===============================
// CREATE BOOKING
// ===============================
export const createBooking = async (req, res) => {
  try {
    const { client, worker, serviceType, message } = req.body;

    const booking = await Booking.create({
      client,
      worker,
      serviceType,
      message,
      status: "requested",
    });

    // 🔥 NOTIFY WORKER
    await Notification.create({
      user: worker,
      title: "New Booking Request",
      message: "You have received a new booking request",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.log("CREATE BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// GET WORKER BOOKINGS
// ===============================
export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      worker: req.params.workerId,
    })
      .populate("client", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.log("GET BOOKINGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// UPDATE BOOKING STATUS (LIFECYCLE)
// ===============================
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

    // 🔥 NOTIFY CLIENT
    await Notification.create({
      user: booking.client._id,
      title: "Booking Updated",
      message: `Your booking is now ${status}`,
    });

    // 🔥 NOTIFY WORKER
    await Notification.create({
      user: booking.worker._id,
      title: "Booking Status Changed",
      message: `Booking is now ${status}`,
    });

    res.json(booking);
  } catch (err) {
    console.log("UPDATE BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// GET NOTIFICATIONS (OPTIONAL LEGACY)
// ===============================
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};