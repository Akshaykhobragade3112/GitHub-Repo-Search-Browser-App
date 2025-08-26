import mongoose from "mongoose";
const { Schema } = mongoose;

const searchSchema = new Schema(
  {
    keyword: { type: String, index: true },
    repos: [{ type: Schema.Types.ObjectId, ref: "Repo" }],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Search", searchSchema);
