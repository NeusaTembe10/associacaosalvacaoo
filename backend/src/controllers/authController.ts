import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const FIXED_PASSWORD = process.env.AUTH_PASSWORD || "SalvacaoApp@2026";

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, password } = req.body;

  if (!name?.trim() || password !== FIXED_PASSWORD) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  try {
    const token = jwt.sign(
      { name: name.trim() },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.json({ token, user: { name: name.trim() } });
  } catch (error) {
    return res.status(500).json({ error: "Erro na autenticação" });
  }
};
