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
        const productData = await fetchProductById(parseInt(productId));
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
      await updateProduct(parseInt(productId), formData);
      showNotification('Product updated successfully!', 'success');
      router.push('/');
    } catch (err) {
      showNotification('Failed to update product', 'error');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">🌸 Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="card-feminine p-8 max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-feminine-heading text-xl mb-3">Erro</h2>
            <p className="text-red-600 mb-6">{error || 'Produto não encontrado'}</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary inline-flex items-center"
            >
              🏠 Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-rose-600 hover:text-rose-700 mb-6 font-medium mx-auto"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            ← Voltar
          </button>
          
          <div className="card-feminine p-8">
            <h1 className="text-feminine-script text-4xl text-rose-800 mb-4">Editar Item</h1>
            <p className="text-gray-600 text-lg mt-2">
              Atualize as informações de <span className="font-medium text-rose-700">{product.name}</span>
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-gold-300 mx-auto mt-4"></div>
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