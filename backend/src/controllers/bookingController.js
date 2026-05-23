import Booking from "../models/Booking.js";
import Notification from "../models/Notification.js"; 

export const createBooking = async (req, res) => {
  try {
    const io = req.app.get("io");

    const booking = await Booking.create({
      client: req.body.client,
      worker: req.body.worker,
      serviceType: req.body.serviceType,
      message: req.body.message,
    });

    await Notification.create({
  user: req.body.worker,
  message: "New booking request received",
  type: "booking",
});

    // 🔥 REAL-TIME EVENT
    io.emit("new-booking", booking);
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerBookings =
  async (req, res) => {
    try {
      const bookings =
        await Booking.find({
          worker: req.params.workerId,
        })
          .populate(
            "client",
            "firstName lastName"
          );

      res.json(bookings);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateBookingStatus =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res
          .status(404)
          .json({
            message:
              "Booking not found",
          });
      }

      booking.status =
        req.body.status;

      await booking.save();

      res.json(booking);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};