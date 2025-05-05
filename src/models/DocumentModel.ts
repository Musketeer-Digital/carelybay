import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IDocument extends Document {
  userId: Types.ObjectId;
  fileName: string;
  fileUrl: string;
  fileType: string;
  size: number;
  uploadedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const DocumentsModel =
  mongoose.models.DocumentsModel ||
  model<IDocument>("Documents", DocumentSchema);
export default DocumentsModel;
