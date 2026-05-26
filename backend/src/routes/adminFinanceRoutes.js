import express from "express";

import {
  getFinanceSummary,
  getAllPayments,
} from "../controllers/adminFinanceController.js";

const router = express.Router();

router.get("/summary", getFinanceSummary);
router.get("/payments", getAllPayments);

export default router;