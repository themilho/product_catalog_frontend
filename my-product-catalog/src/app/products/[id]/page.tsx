import { fetchProductById } from '@/services/api';
import { Product } from '@/types/product';
import Link from 'next/link';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product | null = null;
  let error = null;
  
  try {
    product = await fetchProductById(Number(id));
  } catch (e) {
    error = e;
    console.error('Error fetching product:', e);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar produto</h1>
            <p className="text-gray-700 mb-6">Não foi possível carregar as informações do produto.</p>
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h1>
            <p className="text-gray-700 mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link 
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            {product.imageUrl ? (
              <img
                className="h-64 w-full object-cover md:h-full"
                src={product.imageUrl}
                alt={product.name}
              />
            ) : (
              <div className="h-64 w-full bg-gray-200 flex items-center justify-center md:h-full">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.favorite ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {product.favorite ? 'Favorito' : 'Não Favorito'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Descrição</h2>
              <p className="mt-2 text-gray-600">{product.description || 'Sem descrição disponível.'}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Preço</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</p>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <Link 
                href={`/products/edit/${product.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors"
              >
                Editar
              </Link>
              <Link 
                href="/"
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-md transition-colors"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}