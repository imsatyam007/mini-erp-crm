import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  search,
} from "./customer.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/search", search);
router.get("/", getAll);
router.get("/:id", getOne);

router.post(
  "/",
  authorize("ADMIN", "SALES"),
  create
);

router.put(
  "/:id",
  authorize("ADMIN", "SALES"),
  update
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  remove
);

export default router;