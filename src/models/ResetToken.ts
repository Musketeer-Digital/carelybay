import mongoose, { Schema, model } from "mongoose";

export interface ResetTokenDocument {
  _id: string;
  email: string;
  token: string;
}

const ResetTokenSchema = new Schema<ResetTokenDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid",
      ],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const ResetToken =
  mongoose.models?.ResetToken ||
  model<ResetTokenDocument>("ResetToken", ResetTokenSchema);
export default ResetToken;
