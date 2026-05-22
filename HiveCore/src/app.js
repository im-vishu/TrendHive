import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:8080" }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "HiveCore" });
  });

  app.use("/api/products", productRoutes);
  app.use("/api/auth", authRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
