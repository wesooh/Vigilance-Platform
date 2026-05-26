import express from "express";
import {
  startVerification,
  verifyOTP,
} from "../controllers/verificationController.js";

const router = express.Router();

router.post("/start", startVerification);
router.post("/verify", verifyOTP);

export default router;