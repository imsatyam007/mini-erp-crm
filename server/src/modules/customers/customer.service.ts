import prisma from "../../lib/prisma.js";
import { CreateCustomerInput } from "./customer.validation.js";

export async function createCustomer(
  data: CreateCustomerInput
) {
  return await prisma.customer.create({
    data,
  });
}

export async function getCustomers() {
  return await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCustomerById(id: string) {
  return await prisma.customer.findUnique({
    where: { id },
  });
}

export async function updateCustomer(
  id: string,
  data: Partial<CreateCustomerInput>
) {
  return await prisma.customer.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return await prisma.customer.delete({
    where: { id },
  });
}

export async function searchCustomers(query: string) {
  if (!query) {
    return await getCustomers();
  }

  return await prisma.customer.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          mobile: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          businessName: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}