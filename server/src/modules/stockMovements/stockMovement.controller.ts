import type { Request, Response } from "express";
import { createStockMovementSchema } from "./stockMovement.validation";
import {
  createStockMovement,
  getAllStockMovements,
  getStockMovementById,
} from "./stockMovement.service";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createStockMovementSchema.parse(req.body);

    const user = req.user as { id: string };

    const movement = await createStockMovement(data, user.id);

    return res.status(201).json({
      success: true,
      message: "Stock movement created successfully.",
      data: movement,
    });
  } catch (error: any) {
  console.error("Stock Movement Error:", error);

  return res.status(400).json({
    success: false,
    message: error.message,
    error,
  });
}
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const movements = await getAllStockMovements();

    return res.status(200).json({
      success: true,
      data: movements,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const movement = await getStockMovementById(req.params.id);

    if (!movement) {
      return res.status(404).json({
        success: false,
        message: "Stock movement not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: movement,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};