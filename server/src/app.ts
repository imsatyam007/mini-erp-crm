import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import stockMovementRoutes from "./modules/stockMovements/stockMovement.routes.js";
import challanRoutes from "./modules/challans/challan.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

import { authenticate } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/challans", challanRoutes);

// Health Check
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Mini ERP + CRM Backend is running 🚀",
  });
});

// Protected Route
app.get("/api/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.use(errorHandler);
export default app;