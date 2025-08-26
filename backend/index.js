import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import searchRoutes from "./src/routes/search.routes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

dotenv.config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));


app.get("/api/health", (_req, res) => res.json({ ok: true, service: "backend", ts: new Date() }));
app.use("/api", searchRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
