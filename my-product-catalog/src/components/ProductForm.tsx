'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { 
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const categories = [
  'Eletrônicos',
  'Roupas',
  'Casa & Jardim',
  'Esportes',
  'Livros',
  'Brinquedos',
  'Saúde & Beleza',
  'Automotivo',
  'Alimentos & Bebidas',
  'Outros'
];

export default function ProductForm({ initialData, onSubmit, isLoading, mode = 'create' }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    favorite: initialData?.favorite || false,
    imageUrl: initialData?.imageUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price must be positive';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      // Handle price as number, convert empty string to 0
      const numericValue = value === '' ? 0 : parseFloat(value) || 0;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Prepare data for submission, removing empty imageUrl
      const submitData = {
        ...formData,
        imageUrl: formData.imageUrl.trim() || undefined
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error('Erro no handleSubmit do ProductForm:', error);
      throw error;
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (errors.imageUrl) {
      setErrors(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Criar Novo Item' : 'Editar Item'}
          </h2>
          <p className="text-gray-600 mt-1">
            {mode === 'create' ? 'Adicione um novo item à sua coleção' : 'Atualize as informações do item'}
          </p>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
            placeholder="Digite o nome do item"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Descreva seu item (opcional)"
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Preço *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`input-field pl-8 ${errors.price ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="0.00"
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setFormData(prev => ({ ...prev, price: 0 }));
                  }
                }}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
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

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem
          </label>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`input-field ${errors.imageUrl ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {errors.imageUrl && (
              <p className="text-sm text-red-600">{errors.imageUrl}</p>
            )}
            
            {/* Image Preview */}
            {formData.imageUrl && !errors.imageUrl && (
              <div className="mt-3">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setErrors(prev => ({ ...prev, imageUrl: 'Invalid image URL' }))}
                  />
                </div>
              </div>
            )}
            
            {!formData.imageUrl && (
              <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <PhotoIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Favorite Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            checked={formData.favorite}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="favorite" className="text-sm font-medium text-gray-700">
            Marcar como favorito
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{mode === 'create' ? 'Criando...' : 'Atualizando...'}</span>
              </div>
            ) : (
              mode === 'create' ? 'Criar Item' : 'Atualizar Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}