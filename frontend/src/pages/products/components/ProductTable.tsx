import type { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <p className="text-text-secondary">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <p className="text-text-secondary">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl shadow-card overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border">
          <tr className="text-left">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Min Stock</th>
            <th className="px-4 py-3">Warehouse</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-4 py-3">{product.name}</td>

              <td className="px-4 py-3">{product.sku}</td>

              <td className="px-4 py-3">{product.category}</td>

              <td className="px-4 py-3">
                ₹{Number(product.unitPrice).toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3">{product.currentStock}</td>

              <td className="px-4 py-3">{product.minimumStock}</td>

              <td className="px-4 py-3">{product.warehouse}</td>

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}