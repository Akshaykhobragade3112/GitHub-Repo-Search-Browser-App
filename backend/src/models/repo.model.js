import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    repoId: { type: Number, unique: true, index: true },
    name: String,
    fullName: String,
    htmlUrl: String,
    description: String,
    language: String,
    stargazers: Number,
    ownerLogin: String,
    pushedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Repo", repoSchema);
