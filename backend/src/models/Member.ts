import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  nome: string;
  idade: number;
  morada: string;
  contacto: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    idade: {
      type: Number,
      required: false,
    },
    morada: {
      type: String,
      trim: true,
    },
    contacto: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Membro", "Visitante", "Novo Convertido"],
      default: "Visitante",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMember>("Member", MemberSchema);
