import { PrismaClient, MovementType } from "@prisma/client";
import type { CreateStockMovementInput } from "./stockMovement.validation";

const prisma = new PrismaClient();

export const createStockMovement = async (
  data: CreateStockMovementInput,
  createdById: string
) => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let updatedStock = product.currentStock;

    if (data.movementType === MovementType.IN) {
      updatedStock += data.quantity;
    } else {
      if (product.currentStock < data.quantity) {
        throw new Error("Insufficient stock");
      }

      updatedStock -= data.quantity;
    }

    await tx.product.update({
      where: {
        id: product.id,
      },
      data: {
        currentStock: updatedStock,
      },
    });

    const movement = await tx.stockMovement.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        movementType: data.movementType,
        reason: data.reason,
        createdById,
      },
      include: {
        product: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return movement;
  });
};

export const getAllStockMovements = async () => {
  return prisma.stockMovement.findMany({
    include: {
      product: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStockMovementById = async (id: string) => {
  return prisma.stockMovement.findUnique({
    where: {
      id,
    },
    include: {
      product: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};