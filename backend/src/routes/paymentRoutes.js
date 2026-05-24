import express from "express";

import {
  createPayment,
} from "../controllers/paymentController.js";

import { getWorkerPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/worker/:workerId", getWorkerPayments);

export default router;