import express from "express";

import {
  createBooking,
  getWorkerBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get(
  "/worker/:workerId",
  getWorkerBookings
);

router.put(
  "/:id",
  updateBookingStatus
);

export default router;