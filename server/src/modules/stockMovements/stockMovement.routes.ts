import { Router } from "express";
import { Role } from "@prisma/client";

import {
  create,
  getAll,
  getById,
} from "./stockMovement.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

/**
 * Create Stock Movement
 */
router.post(
  "/",
  authorize(Role.ADMIN, Role.WAREHOUSE),
  create
);

/**
 * Get All Stock Movements
 */
router.get(
  "/",
  authorize(Role.ADMIN, Role.WAREHOUSE),
  getAll
);

/**
 * Get Stock Movement By ID
 */
router.get(
  "/:id",
  authorize(Role.ADMIN, Role.WAREHOUSE),
  getById
);

export default router;