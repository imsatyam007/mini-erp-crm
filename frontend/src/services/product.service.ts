import axiosInstance from "@/api/axios";
import type {
  CreateProductRequest,
  Product,
  ProductListResponse,
  ProductResponse,
  UpdateProductRequest,
} from "@/types/product";

class ProductService {
  async getProducts(): Promise<Product[]> {
    const { data } = await axiosInstance.get<ProductListResponse>("/products");
    return data.products;
  }

  async getProductById(id: string): Promise<Product> {
    const { data } = await axiosInstance.get<ProductResponse>(
      `/products/${id}`
    );
    return data.product;
  }

  async createProduct(
    product: CreateProductRequest
  ): Promise<Product> {
    const { data } = await axiosInstance.post<ProductResponse>(
      "/products",
      product
    );

    return data.product;
  }

  async updateProduct(
    id: string,
    product: UpdateProductRequest
  ): Promise<Product> {
    const { data } = await axiosInstance.put<ProductResponse>(
      `/products/${id}`,
      product
    );

    return data.product;
  }
}

export default new ProductService();