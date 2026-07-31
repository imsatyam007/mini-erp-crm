import { useCallback, useEffect, useState } from "react";
import productService from "@/services/product.service";

import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (
    product: CreateProductRequest
  ): Promise<boolean> => {
    try {
      await productService.createProduct(product);
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Failed to create product:", error);
      return false;
    }
  };

  const updateProduct = async (
    id: string,
    product: UpdateProductRequest
  ): Promise<boolean> => {
    try {
      await productService.updateProduct(id, product);
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Failed to update product:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
  };
}