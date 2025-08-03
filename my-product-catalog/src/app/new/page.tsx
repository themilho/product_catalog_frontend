'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';
import { createProduct } from '@/services/api';
import { useApp } from '@/context/AppContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NewProductPage() {
  const router = useRouter();
  const { showNotification } = useApp();

  const handleSubmit = async (formData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      await createProduct(formData);
      showNotification('Produto criado com sucesso!', 'success');
      router.push('/');
    } catch (err) {
      showNotification('Falha ao criar produto', 'error');
      throw err;
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Criar Novo Item</h1>
            <p className="text-gray-600 mt-2">
              Adicione um novo item ao seu catálogo de produtos
            </p>
          </div>
        </div>

        {/* Form */}
        <ProductForm
          mode="create"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}