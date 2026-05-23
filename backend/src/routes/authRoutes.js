import express from "express";
import { register,
    login,
    getWorkers, 
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/workers", getWorkers);

export default router;