import { Router } from "express";
import { body } from "express-validator";
import { login } from "../controllers/authController.js";

const router = Router();

router.post(
  "/login",
  [
    body("name").trim().notEmpty().withMessage("Nome é obrigatório"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter ao menos 6 caracteres"),
  ],
  login
);

export default router;
