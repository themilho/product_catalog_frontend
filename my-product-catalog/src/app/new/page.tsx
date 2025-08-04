'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';
import { createProduct } from '@/services/api';
import { useApp } from '@/context/AppContext';

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
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-feminine-script text-4xl text-rose-800 mb-4">
            Criar Novo Item
          </h1>
          <p className="text-gray-600 text-lg">
            Adicione um novo item ao seu catálogo de produtos
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-gold-300 mx-auto mt-4"></div>
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