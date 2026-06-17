import { Router } from "express";
import { body } from "express-validator";
import * as cultoController from "../controllers/cultoController.js";

const router = Router();

router.get("/", cultoController.getAllCultos);

router.post(
  "/",
  [
    body("data").isISO8601().withMessage("Data inválida"),
    body("tipo").isIn(["Culto", "Cruzada", "Evangelização", "Reunião"]).withMessage("Tipo inválido"),
    body("localizacao").trim().notEmpty().withMessage("Localização é obrigatória"),
  ],
  cultoController.createCulto
);

router.get("/:id", cultoController.getCultoById);

router.put("/:id", cultoController.updateCulto);

router.delete("/:id", cultoController.deleteCulto);

router.post("/:id/addMember", cultoController.addMemberToCulto);

export default router;
