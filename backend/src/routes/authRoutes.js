import express from "express";
import { register,
    login,
    getWorkers, 
    getWorkerById,
    updateWorkerProfile
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/workers", getWorkers);
router.get("/workers/:id", getWorkerById);
router.put("/workers/:id", updateWorkerProfile);

export default router;