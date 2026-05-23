import express from "express";

import {
  createBooking,
  getWorkerBookings,
  updateBookingStatus,
  getNotifications,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get(
  "/worker/:workerId",
  getWorkerBookings
);

router.get("/notifications/:userId", getNotifications);

router.put(
  "/:id",
  updateBookingStatus
);

export default router;