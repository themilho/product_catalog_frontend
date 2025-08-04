'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ProductFormProps {
  initialData?: Partial<Omit<Product, 'id'>>;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export default function ProductForm({ initialData, onSubmit, isLoading = false, mode }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    imageUrl: initialData?.imageUrl || '',
    favorite: initialData?.favorite || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        category: initialData.category || '',
        imageUrl: initialData.imageUrl || '',
        favorite: initialData.favorite || false,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const categories = [
    'Kits temáticos',
    'Jóias',
    'Beleza e saúde',
    'Bolsas e necessaire',
    'Acessórios',
    'Outros'
  ];

  return (
    <div className="card-feminine p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-rose-700 mb-2">
            ✨ Nome do Produto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-feminine w-full ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
            placeholder="Digite o nome do produto..."
            disabled={isSubmitting || isLoading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-rose-700 mb-2">
            📝 Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-feminine w-full resize-none"
            placeholder="Descreva o produto (opcional)..."
            disabled={isSubmitting || isLoading}
          />
        </div>

        {/* Preço e Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preço */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-rose-700 mb-2">
              💰 Preço *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-600 font-medium">
                R$
              </span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`input-feminine w-full pl-12 ${
                  errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="0,00"
                disabled={isSubmitting || isLoading}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-rose-700 mb-2">
              🏷️ Categoria *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-feminine w-full ${
                errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              }`}
              disabled={isSubmitting || isLoading}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        </div>

        {/* URL da Imagem */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-rose-700 mb-2">
            🖼️ URL da Imagem
          </label>
          <div className="relative">
            <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" />
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="input-feminine w-full pl-12"
              placeholder="https://exemplo.com/imagem.jpg"
              disabled={isSubmitting || isLoading}
            />
          </div>
        </div>

        {/* Favorito */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            checked={formData.favorite}
            onChange={handleChange}
            className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
            disabled={isSubmitting || isLoading}
          />
          <label htmlFor="favorite" className="ml-3 text-sm font-medium text-rose-700">
            ❤️ Marcar como favorito
          </label>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {mode === 'create' ? 'Criando...' : 'Salvando...'}
              </div>
            ) : (
              <span>
                {mode === 'create' ? '✨ Criar Produto' : '💾 Salvar Alterações'}
              </span>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            disabled={isSubmitting || isLoading}
            className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}