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

app.use(cors());
app.use(express.json());

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/associacao_salvacao");
  console.log("✓ MongoDB connected");
};

connectDb().catch((err) => console.error("✗ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/members", verifyToken, memberRoutes);
app.use("/api/cultos", verifyToken, cultoRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Erro interno do servidor" });
});
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

export default app;
