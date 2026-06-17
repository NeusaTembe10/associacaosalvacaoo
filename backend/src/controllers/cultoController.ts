import { Request, Response } from "express";
import Culto, { ICulto } from "../models/Culto.js";
import { validationResult } from "express-validator";

export const getAllCultos = async (req: Request, res: Response) => {
  try {
    const cultos = await Culto.find().populate("membros").sort({ data: -1 });
    res.json(cultos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cultos" });
  }
};

export const createCulto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { data, tipo, localizacao, descricao, membros } = req.body;

    const culto = new Culto({
      data,
      tipo,
      localizacao,
      descricao,
      membros: membros || [],
    });

    await culto.save();
    await culto.populate("membros");
    res.status(201).json(culto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar culto" });
  }
};

export const getCultoById = async (req: Request, res: Response) => {
  try {
    const culto = await Culto.findById(req.params.id).populate("membros");
    if (!culto) {
      return res.status(404).json({ error: "Culto não encontrado" });
    }
    res.json(culto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar culto" });
  }
};

export const updateCulto = async (req: Request, res: Response) => {
  try {
    const { data, tipo, localizacao, descricao, membros } = req.body;

    const culto = await Culto.findByIdAndUpdate(
      req.params.id,
      { data, tipo, localizacao, descricao, membros },
      { new: true, runValidators: true }
    ).populate("membros");

    if (!culto) {
      return res.status(404).json({ error: "Culto não encontrado" });
    }

    res.json(culto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar culto" });
  }
};

export const deleteCulto = async (req: Request, res: Response) => {
  try {
    const culto = await Culto.findByIdAndDelete(req.params.id);
    if (!culto) {
      return res.status(404).json({ error: "Culto não encontrado" });
    }
    res.json({ message: "Culto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar culto" });
  }
};

export const addMemberToCulto = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;
    const culto = await Culto.findById(req.params.id);

    if (!culto) {
      return res.status(404).json({ error: "Culto não encontrado" });
    }

    if (!culto.membros.includes(memberId)) {
      culto.membros.push(memberId);
      await culto.save();
    }

    await culto.populate("membros");
    res.json(culto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar membro ao culto" });
  }
};
