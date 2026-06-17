import mongoose, { Schema, Document } from "mongoose";

export interface ICulto extends Document {
  data: Date;
  tipo: string;
  localizacao: string;
  descricao?: string;
  membros: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CultoSchema = new Schema<ICulto>(
  {
    data: {
      type: Date,
      required: [true, "Data é obrigatória"],
    },
    tipo: {
      type: String,
      enum: ["Culto", "Cruzada", "Evangelização", "Reunião"],
      required: true,
    },
    localizacao: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    membros: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICulto>("Culto", CultoSchema);
