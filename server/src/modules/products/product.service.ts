import prisma from "../../lib/prisma.js";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "./product.validation.js";

export async function createProduct(
  data: CreateProductInput
) {
  return await prisma.product.create({
    data,
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProduct(
  id: string,
  data: UpdateProductInput
) {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
}