import express from "express";
import {
    requestVerification,
    verifyWorkerProfile,
    checkVerification,
  checkProfileCompletion,
  sendOTP,
  verifyOTP,
} from "../controllers/verificationController.js";

const router = express.Router();

router.get("/check/:id", checkProfileCompletion);
router.post("/otp/send/:id", sendOTP);
router.post("/otp/verify/:id", verifyOTP);

export default router;