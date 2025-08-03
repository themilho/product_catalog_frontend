import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function HomePage() {
  const initialProducts: Product[] = await fetchProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Produtos</h1>
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}