'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';
import { fetchProductById, updateProduct } from '@/services/api';
import { useApp } from '@/context/AppContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { showNotification } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await fetchProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product');
        showNotification('Failed to load product', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, showNotification]);

  const handleSubmit = async (formData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      await updateProduct(productId, formData);
      showNotification('Product updated successfully!', 'success');
      router.push('/');
    } catch (err) {
      showNotification('Failed to update product', 'error');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Erro</h2>
            <p className="text-red-600 mb-4">{error || 'Produto não encontrado'}</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Editar Item</h1>
            <p className="text-gray-600 mt-2">
              Atualize as informações de <span className="font-medium">{product.name}</span>
            </p>
          </div>
        </div>

        {/* Form */}
        <ProductForm
          mode="edit"
          initialData={product}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}