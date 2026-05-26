import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";  

dotenv.config();

import connectDB from "./config/db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; 
import reviewRoutes from "./routes/reviewRoutes.js"; 
import adminFinanceRoutes from "./routes/adminFinanceRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);  
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin/finance", adminFinanceRoutes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// STORE ONLINE WORKERS
const onlineWorkers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (bookingId) => {
    socket.join(bookingId);
    console.log(`Joined room: ${bookingId}`);
  });

  // SEND MESSAGE TO ROOM ONLY
  socket.on("send-message", (message) => {
    io.to(message.booking).emit(
      "receive-message",
      message
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// MAKE IO AVAILABLE GLOBALLY
app.set("io", io);

app.use("/api/bookings", bookingRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

console.log("MONGO_URI:", process.env.MONGO_URI);