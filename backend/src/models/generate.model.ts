import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGenerate extends Document {
  _id: Types.ObjectId;
  keywords: string[];
  tone: string;
  ageGroup: string;
  description: string;
  userId?: Types.ObjectId;
}

const GenerateSchema: Schema<IGenerate> = new Schema(
  {
    keywords: { type: [String], required: true },
    tone: { type: String, required: true },
    ageGroup: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGenerate>("Generate", GenerateSchema);
