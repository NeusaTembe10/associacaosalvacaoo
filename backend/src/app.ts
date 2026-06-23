import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import memberRoutes from "./routes/memberRoutes";
import cultoRoutes from "./routes/cultoRoutes";
import authRoutes from "./routes/authRoutes";
import { verifyToken } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Use a variável de ambiente para o URL do frontend
  optionsSuccessStatus: 200,
};

// =====================
// MIDDLEWARE GLOBAL
// =====================
app.use(cors(corsOptions));
app.use(express.json());

// LOG (DEVE VIR AQUI EM CIMA)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// =====================
// MONGODB
// =====================
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "MONGO_URI must be defined in the production environment"
    );
  } else {
    console.warn("MONGO_URI is not defined. Using fallback for development.");
  }
}

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(
      MONGO_URI || "mongodb://localhost:27017/associacao_salvacao"
    );
    console.log("✓ MongoDB connected");
  } catch (err) {
    console.error("✗ MongoDB connection error:", err);
    // Em um ambiente de produção, você pode querer que o app pare se não conseguir conectar.
    // process.exit(1);
  }
};

app.use(async (req: Request, res: Response, next: NextFunction) => {
  await connectDb();
  next();
});

// =====================
// ROTAS
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/members", verifyToken, memberRoutes);
app.use("/api/cultos", verifyToken, cultoRoutes);
app.post("/api/test", (req, res) => {
  res.json({ ok: true });
});

// HEALTH CHECK
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// =====================
// ERROR HANDLER (CORRIGIDO TS)
// =====================
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(err.status || 500).json({
      error: err.message || "Erro interno do servidor",
    });
  }
);

export default app;
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import memberRoutes from "./routes/memberRoutes.js";
// import cultoRoutes from "./routes/cultoRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import { verifyToken } from "./middleware/authMiddleware.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const connectDb = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }

//   await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/associacao_salvacao");
//   console.log("✓ MongoDB connected");
// };

// connectDb().catch((err) => console.error("✗ MongoDB connection error:", err));

// app.use("/api/auth", authRoutes);
// app.use("/api/members", verifyToken, memberRoutes);
// app.use("/api/cultos", verifyToken, cultoRoutes);

// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", timestamp: new Date() });
// });

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err);
//   res.status(err.status || 500).json({ error: err.message || "Erro interno do servidor" });
// });

// export default app;
