import { Request, Response } from "express";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "./customer.validation.js";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
} from "./customer.service.js";

// Create Customer
export async function create(req: Request, res: Response) {
  try {
    const data = createCustomerSchema.parse(req.body);

    const customer = await createCustomer(data);

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer,
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

// Get All Customers
export async function getAll(
  _req: Request,
  res: Response
) {
  try {
    const customers = await getCustomers();

    return res.json({
      success: true,
      customers,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Get Customer By ID
export async function getOne(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const customer = await getCustomerById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.json({
      success: true,
      customer,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Update Customer
export async function update(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    // Validate request body
    const data = updateCustomerSchema.parse(req.body);

    const customer = await updateCustomer(
      req.params.id,
      data
    );

    return res.json({
      success: true,
      message: "Customer updated successfully",
      customer,
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

// Delete Customer
export async function remove(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    await deleteCustomer(req.params.id);

    return res.json({
      success: true,
      message: "Customer deleted successfully",
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
// Search Customers
export async function search(req: Request, res: Response) {
  try {
    const query = String(req.query.q ?? "").trim();

    const customers = await searchCustomers(query);

    return res.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}