import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
