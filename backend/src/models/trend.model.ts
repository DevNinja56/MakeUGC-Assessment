import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITrend extends Document {
  _id: Types.ObjectId;
  geo: string;
  trends: Record<string, any>[];
  expiresIn: Date;
}

const TrendSchema: Schema<ITrend> = new Schema(
  {
    geo: { type: String, required: true },
    trends: {
      type: [{ type: Schema.Types.Mixed }],
      required: true,
    },
    expiresIn: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITrend>("Trend", TrendSchema);
