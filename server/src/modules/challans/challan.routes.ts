import { Router } from "express";
import { Role } from "@prisma/client";

import challanController from "./challan.controller";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

// Protect all routes
router.use(authenticate);

/**
 * Get All Challans
 */
router.get(
  "/",
  authorize(Role.ADMIN, Role.SALES),
  challanController.getAll
);

/**
 * Get Challan By ID
 */
router.get(
  "/:id",
  authorize(Role.ADMIN, Role.SALES),
  challanController.getById
);

/**
 * Create Challan
 */
router.post(
  "/",
  authorize(Role.ADMIN, Role.SALES),
  challanController.create
);

/**
 * Update Challan
 */
router.patch(
  "/:id",
  authorize(Role.ADMIN, Role.SALES),
  challanController.update
);

/**
 * Cancel Challan
 */
router.patch(
  "/:id/cancel",
  authorize(Role.ADMIN, Role.SALES),
  challanController.cancel
);

export default router;