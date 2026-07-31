import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(
  id: string,
  email: string,
  role: string
) {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}