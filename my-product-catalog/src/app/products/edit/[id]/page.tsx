'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductById, updateProduct } from '@/services/api';
import { Product } from '@/types/product';
import { useApp } from '@/context/AppContext';
import ProductForm from '@/components/ProductForm';
import Link from 'next/link';

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { showNotification } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [initialData, setInitialData] = useState<Partial<Omit<Product, 'id'>>>({});
  const { id } = use(params);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
        setInitialData({
          name: data.name,
          description: data.description || '',
          price: data.price,
          category: data.category,
          favorite: data.favorite || false,
          imageUrl: data.imageUrl || '',
        });
      } catch (err) {
        setError('Erro ao carregar o produto. Tente novamente.');
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (formData: Omit<Product, 'id' | 'createdAt'>) => {
    setIsSaving(true);
    setError(null);

    try {
      await updateProduct(Number(id), formData);
      showNotification('Produto atualizado com sucesso!', 'success');
      router.push(`/products/${id}`);
    } catch (err) {
      setError('Erro ao salvar o produto. Verifique os dados e tente novamente.');
      showNotification('Erro ao atualizar o produto', 'error');
      console.error('Error updating product:', err);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Produto</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isSaving}
          mode="edit"
        />
      </div>
    </main>
  );
}