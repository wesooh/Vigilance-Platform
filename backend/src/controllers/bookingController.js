import Booking from "../models/Booking.js";

export const createBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.create({
        client: req.body.client,
        worker: req.body.worker,
        serviceType:
          req.body.serviceType,
        message: req.body.message,
      });

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