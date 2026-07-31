import {
  ChallanStatus,
  MovementType,
  Prisma,
} from "@prisma/client";

import prisma from "../../lib/prisma";

import type { CreateChallanInput } from "./challan.validation";

export class ChallanService {
  /**
   * Generate Challan Number
   * Example:
   * CH-20260730-0001
   */
  private async generateChallanNumber(
    tx: Prisma.TransactionClient
  ): Promise<string> {
    const today = new Date();

    const date =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const count = await tx.salesChallan.count();

    const sequence = String(count + 1).padStart(4, "0");

    return `CH-${date}-${sequence}`;
  }


  async getAll() {
  const challans = await prisma.salesChallan.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          businessName: true,
          mobile: true,
        },
      },

      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return challans;
}


async getById(id: string) {
  const challan = await prisma.salesChallan.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,

      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },

      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              category: true,
              warehouse: true,
              currentStock: true,
            },
          },
        },
      },
    },
  });

  if (!challan) {
    throw new Error("Sales challan not found.");
  }

  return challan;
}

async update(
  id: string,
  data: CreateChallanInput,
  updatedById: string
) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Find challan
    const existingChallan = await tx.salesChallan.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!existingChallan) {
      throw new Error("Sales challan not found.");
    }

    // Only DRAFT challans can be edited
    if (existingChallan.status !== ChallanStatus.DRAFT) {
      throw new Error("Only DRAFT challans can be updated.");
    }

    // Validate customer
    const customer = await tx.customer.findUnique({
      where: {
        id: data.customerId,
      },
    });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    // Fetch products
    const productIds = data.items.map((item) => item.productId);

    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      throw new Error("One or more products do not exist.");
    }

    // Calculate total quantity
    const totalQuantity = data.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // If confirming, verify stock
    if (data.status === ChallanStatus.CONFIRMED) {
      for (const item of data.items) {
        const product = products.find(
          (p) => p.id === item.productId
        );

        if (!product) continue;

        if (product.currentStock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}`
          );
        }
      }
    }

    // Delete existing items
    await tx.salesChallanItem.deleteMany({
      where: {
        challanId: id,
      },
    });

    // Update challan
    const updatedChallan = await tx.salesChallan.update({
      where: {
        id,
      },

      data: {
        customerId: data.customerId,
        status: data.status,
        totalQuantity,

        items: {
          create: data.items.map((item) => {
            const product = products.find(
              (p) => p.id === item.productId
            )!;

            return {
              productId: product.id,
              productName: product.name,
              productSku: product.sku,
              unitPrice: product.unitPrice,
              quantity: item.quantity,
            };
          }),
        },
      },

      include: {
        customer: true,
        createdBy: true,
        items: true,
      },
    });

    // Deduct stock if confirmed
    if (data.status === ChallanStatus.CONFIRMED) {
      for (const item of data.items) {
        const product = products.find(
          (p) => p.id === item.productId
        )!;

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            currentStock: product.currentStock - item.quantity,
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: product.id,
            quantity: item.quantity,
            movementType: MovementType.OUT,
            reason: `Sales Challan Updated ${updatedChallan.challanNumber}`,
            createdById: updatedById,
          },
        });
      }
    }

    return updatedChallan;
  });
}

async cancel(
  id: string,
  cancelledById: string
) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {

    const challan = await tx.salesChallan.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!challan) {
      throw new Error("Sales challan not found.");
    }

    if (challan.status === ChallanStatus.CANCELLED) {
      throw new Error("Sales challan is already cancelled.");
    }

    /**
     * Restore stock only if challan was confirmed
     */
    if (challan.status === ChallanStatus.CONFIRMED) {

      for (const item of challan.items) {

        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error(
            `Product not found for item ${item.productName}`
          );
        }

        // Restore stock
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            currentStock:
              product.currentStock + item.quantity,
          },
        });

        // Create stock movement
        await tx.stockMovement.create({
          data: {
            productId: product.id,
            quantity: item.quantity,
            movementType: MovementType.IN,
            reason: `Cancelled Sales Challan ${challan.challanNumber}`,
            createdById: cancelledById,
          },
        });
      }
    }

    const cancelledChallan = await tx.salesChallan.update({
      where: {
        id,
      },
      data: {
        status: ChallanStatus.CANCELLED,
      },
      include: {
        customer: true,
        createdBy: true,
        items: true,
      },
    });

    return cancelledChallan;
  });
}


  async create(
    data: CreateChallanInput,
    createdById: string
  ) {
    return prisma.$transaction(async (tx) => {
      /**
       * Validate Customer
       */
      const customer = await tx.customer.findUnique({
        where: {
          id: data.customerId,
        },
      });

      if (!customer) {
        throw new Error("Customer not found.");
      }

      /**
       * Fetch Products
       */
      const productIds = data.items.map(
        (item) => item.productId
      );

      const products = await tx.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (products.length !== productIds.length) {
        throw new Error("One or more products do not exist.");
      }

      /**
       * Total Quantity
       */
      const totalQuantity = data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      /**
       * Generate Challan Number
       */
      const challanNumber =
        await this.generateChallanNumber(tx);

      /**
       * Stock Validation
       */
      if (data.status === ChallanStatus.CONFIRMED) {
        for (const item of data.items) {
          const product = products.find(
            (p) => p.id === item.productId
          );

          if (!product) {
            continue;
          }

          if (product.currentStock < item.quantity) {
            throw new Error(
              `Insufficient stock for ${product.name}`
            );
          }
        }
      }

      /**
       * Create Challan
       */
      const challan = await tx.salesChallan.create({
        data: {
          challanNumber,
          customerId: data.customerId,
          createdById,
          totalQuantity,
          status: data.status,

          items: {
            create: data.items.map((item) => {
              const product = products.find(
                (p) => p.id === item.productId
              )!;

              return {
                productId: product.id,

                productName: product.name,
                productSku: product.sku,
                unitPrice: product.unitPrice,

                quantity: item.quantity,
              };
            }),
          },
        },

        include: {
          customer: true,
          createdBy: true,
          items: true,
        },
      });

      /**
       * Deduct Stock
       */
      if (data.status === ChallanStatus.CONFIRMED) {
        for (const item of data.items) {
          const product = products.find(
            (p) => p.id === item.productId
          )!;

          await tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              currentStock:
                product.currentStock - item.quantity,
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: product.id,
              quantity: item.quantity,
              movementType: MovementType.OUT,
              reason: `Sales Challan ${challan.challanNumber}`,
              createdById,
            },
          });
        }
      }

      return challan;
    });
  }
}

export default new ChallanService();