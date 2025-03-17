import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import libraryRoutes from "./routes/library.routes.js"; // ✅ Import the library routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // ✅ Allow frontend to connect
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200", // ✅ Allow frontend to access APIs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json()); // ✅ Handle JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ Handle form submissions

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/libraries", libraryRoutes); // ✅ Library API routes

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 SLIB Directory API is running...");
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Attach Socket.io to Express app
app.set("socketio", io);

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
