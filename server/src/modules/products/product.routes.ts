import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
} from "./product.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

// Get Products
router.get("/", getAll);
router.get("/:id", getOne);

// Create Product
router.post(
  "/",
  authorize("ADMIN", "WAREHOUSE"),
  create
);

// Update Product
router.put(
  "/:id",
  authorize("ADMIN", "WAREHOUSE"),
  update
);

export default router;