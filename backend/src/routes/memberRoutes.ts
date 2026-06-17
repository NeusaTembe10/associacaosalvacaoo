import { Router } from "express";
import { body } from "express-validator";
import * as memberController from "../controllers/memberController.js";

const router = Router();

router.get("/", memberController.getAllMembers);

router.post(
  "/",
  [
    body("nome").trim().notEmpty().withMessage("Nome é obrigatório"),
    body("idade").optional().isInt({ min: 0, max: 150 }).withMessage("Idade inválida"),
    body("status").optional().isIn(["Membro", "Visitante", "Novo Convertido"]),
  ],
  memberController.createMember
);

router.get("/:id", memberController.getMemberById);

router.put("/:id", memberController.updateMember);

router.delete("/:id", memberController.deleteMember);

export default router;
