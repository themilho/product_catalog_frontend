import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function HomePage() {
  let initialProducts: Product[] = [];
  
  try {
    initialProducts = await fetchProducts();
  } catch (error) {
    console.log('Failed to fetch products during build:', error);
    // Durante o build, não há backend disponível, então usamos array vazio
    // Os produtos serão carregados no lado do cliente
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}