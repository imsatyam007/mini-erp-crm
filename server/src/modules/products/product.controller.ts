import { Request, Response } from "express";

import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "./product.service.js";

// Create Product
export async function create(
  req: Request,
  res: Response
) {
  try {
    const data = createProductSchema.parse(req.body);

    const product = await createProduct(data);

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get All Products
export async function getAll(
  _req: Request,
  res: Response
) {
  try {
    const products = await getProducts();

    return res.json({
      success: true,
      products,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get Product By ID
export async function getOne(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update Product
export async function update(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const data = updateProductSchema.parse(req.body);

    const product = await updateProduct(
      req.params.id,
      data
    );

    return res.json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}