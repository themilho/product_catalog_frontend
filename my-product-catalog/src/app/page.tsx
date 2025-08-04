import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function HomePage() {
  const initialProducts: Product[] = await fetchProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}