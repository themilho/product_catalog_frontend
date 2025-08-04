'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/services/api';
import ProductCard from './ProductCard';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ProductListProps {
  initialProducts: Product[];
}

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'favorites';

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts(filterMode === 'favorites');
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search, category, and favorites
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    loadProducts();
  }, [filterMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-feminine-script text-5xl text-rose-800 mb-4">
          Maya Store
        </h1>
        <p className="text-gray-600 text-lg">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'itens'} encontrados
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-rose-300 to-gold-300 mx-auto mt-4"></div>
      </div>

      {/* Filters and Search */}
      <div className="card-feminine p-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rose-400" />
            <input
              type="text"
              placeholder="🔍 Buscar itens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-feminine w-full pl-12"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-feminine min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '🌸 Todas as Categorias' : category}
                </option>
              ))}
            </select>

            {/* Favorites Filter */}
            <button
              onClick={() => setFilterMode(filterMode === 'all' ? 'favorites' : 'all')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filterMode === 'favorites'
                  ? 'bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 border-2 border-rose-300 shadow-md'
                  : 'bg-white text-rose-600 border-2 border-rose-200 hover:bg-rose-50 shadow-sm'
              }`}
            >
              {filterMode === 'favorites' ? (
                <HeartSolidIcon className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              <span>{filterMode === 'favorites' ? 'Favoritos' : 'Mostrar Favoritos'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-rose-50 rounded-full p-1 border border-rose-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-full transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-rose-700 shadow-md'
                    : 'text-rose-500 hover:text-rose-700'
                }`}
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-full transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-rose-700 shadow-md'
                    : 'text-rose-500 hover:text-rose-700'
                }`}
              >
                <ListBulletIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center">
              {searchQuery || selectedCategory !== 'all' || filterMode === 'favorites' ? (
                <span className="text-3xl">🔍</span>
              ) : (
                <span className="text-3xl">🌸</span>
              )}
            </div>
            <h3 className="text-feminine-script text-2xl text-rose-800 mb-3">
              {searchQuery || selectedCategory !== 'all' || filterMode === 'favorites'
                ? 'Nenhum item encontrado'
                : 'Nenhum item ainda'}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {searchQuery || selectedCategory !== 'all' || filterMode === 'favorites'
                ? 'Tente ajustar sua busca ou filtros para encontrar o que você está procurando.'
                : 'Comece adicionando seu primeiro item para se organizar.'}
            </p>
            {(searchQuery || selectedCategory !== 'all' || filterMode === 'favorites') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilterMode('all');
                }}
                className="text-rose-600 hover:text-rose-700 font-medium underline decoration-rose-300"
              >
                ✨ Limpar todos os filtros
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onUpdate={loadProducts}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}