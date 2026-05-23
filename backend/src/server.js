import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// STORE ONLINE WORKERS
const onlineWorkers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // worker joins room
  socket.on("worker-online", (workerId) => {
    onlineWorkers.set(workerId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// MAKE IO AVAILABLE GLOBALLY
app.set("io", io);

app.use("/api/bookings", bookingRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

console.log("MONGO_URI:", process.env.MONGO_URI);