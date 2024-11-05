import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBookmark extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  generateId: Types.ObjectId;
  planToUse: boolean;
}

const BookmarkSchema: Schema<IBookmark> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    generateId: {
      type: Schema.Types.ObjectId,
      ref: "Generate",
      required: true,
    },
    planToUse: { type: Schema.Types.Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBookmark>("Bookmark", BookmarkSchema);
