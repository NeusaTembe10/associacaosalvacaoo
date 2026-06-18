import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";
import cultoRoutes from "./routes/cultoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/associacao_salvacao")
  .then(() => {
    console.log("✓ MongoDB connected");
  })
  .catch((err) => console.error("✗ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", verifyToken, memberRoutes);
app.use("/api/cultos", verifyToken, cultoRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
