import type { Request, Response } from "express";

import challanService from "./challan.service.js";
import { createChallanSchema } from "./challan.validation.js";

class ChallanController {
  /**
   * Create Challan
   */
  async create(req: Request, res: Response) {
    try {
      const validatedData = createChallanSchema.parse(req.body);

      const user = req.user as {
        id: string;
      };

      const challan = await challanService.create(
        validatedData,
        user.id
      );

      return res.status(201).json({
        success: true,
        message: "Sales challan created successfully.",
        data: challan,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Get All Challans
   */
  async getAll(req: Request, res: Response) {
    try {
      const challans = await challanService.getAll();

      return res.status(200).json({
        success: true,
        data: challans,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Get Challan By ID
   */
  async getById(
  req: Request<{ id: string }>,
  res: Response
) {
    try {
      const { id } = req.params;

      console.log(
  "Methods:",
  Object.getOwnPropertyNames(
    Object.getPrototypeOf(challanService)
  )
);

      const challan = await challanService.getById(id);

      return res.status(200).json({
        success: true,
        data: challan,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Update Challan
   */
  async update(
  req: Request<{ id: string }>,
  res: Response
) {
    try {
      const { id } = req.params;

      const validatedData = createChallanSchema.parse(req.body);

      const user = req.user as {
        id: string;
      };

      const challan = await challanService.update(
        id,
        validatedData,
        user.id
      );

      return res.status(200).json({
        success: true,
        message: "Sales challan updated successfully.",
        data: challan,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Cancel Challan
   */
  async cancel(
  req: Request<{ id: string }>,
  res: Response
) {
    try {
      const { id } = req.params;

      const user = req.user as {
        id: string;
      };

      const challan = await challanService.cancel(
        id,
        user.id
      );

      return res.status(200).json({
        success: true,
        message: "Sales challan cancelled successfully.",
        data: challan,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ChallanController();