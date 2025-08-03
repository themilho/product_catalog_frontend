'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/api';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';

export default function NewProductPage() {
  const router = useRouter();
  const { showNotification } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    favorite: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'price' 
          ? value === '' ? 0 : parseFloat(value) || 0 
          : value,
    }));
  };

  const handleSubmit = async (data: Omit<Product, 'id'>) => {
    setIsSaving(true);
    setError(null);

    try {
      const newProduct = await createProduct(data);
      showNotification('Produto criado com sucesso!', 'success');
      router.push(`/products/${newProduct.id}`);
    } catch (err) {
      setError('Erro ao criar o produto. Verifique os dados e tente novamente.');
      showNotification('Erro ao criar o produto', 'error');
      console.error('Error creating product:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Novo Produto</h1>
        
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={isSaving}
          mode="create"
        />
      </div>
    </main>
  );
}