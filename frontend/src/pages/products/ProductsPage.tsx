import { useState } from "react";

import { useProducts } from "@/hooks/useProducts";

import ProductForm from "@/pages/products/ProductForm";
import ProductTable from "@/pages/products/components/ProductTable";

import type {
  CreateProductRequest,
  Product,
} from "@/types/product";

export default function ProductsPage() {
  const {
    products,
    loading,
    createProduct,
    updateProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

const handleSubmit = async (data: CreateProductRequest) => {
  const success = editingProduct
    ? await updateProduct(editingProduct.id, data)
    : await createProduct(data);

  if (success) {
    setEditingProduct(null);
  }
};

  return (
    <div className="space-y-8">
      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <ProductTable
        products={products}
        loading={loading}
        onEdit={setEditingProduct}
      />
    </div>
  );
}