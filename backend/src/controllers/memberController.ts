import { Request, Response } from "express";
import Member, { IMember } from "../models/Member.js";
import { validationResult } from "express-validator";

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membros" });
  }
};

export const createMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, idade, morada, contacto, status } = req.body;

    const member = new Member({
      nome,
      idade,
      morada,
      contacto,
      status: status || "Visitante",
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar membro" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membro" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { nome, idade, morada, contacto, status } = req.body;

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { nome, idade, morada, contacto, status },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar membro" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }
    res.json({ message: "Membro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar membro" });
  }
};
