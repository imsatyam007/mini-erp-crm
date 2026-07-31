import { Request, Response } from "express";
import { registerSchema } from "./auth.validation.js";
import { registerUser } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { loginUser } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    // Validate request body
    const data = registerSchema.parse(req.body);

    // Create user
    const user = await registerUser(data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
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

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

res.status(200).json({
  success: true,
  message: "Login successful",
  token: result.token,
  user: result.user,
});
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
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

export function getCurrentUser(req: Request, res: Response) {
  return res.json({
    success: true,
    user: req.user,
  });
}