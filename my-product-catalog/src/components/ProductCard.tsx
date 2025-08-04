'use client';

import { Product } from '@/types/product';
import { toggleFavorite, deleteProduct } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  HeartIcon, 
  PencilIcon, 
  TrashIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  onUpdate: () => void;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, onUpdate, viewMode = 'grid' }: ProductCardProps) {
  const router = useRouter();
  const { showNotification } = useApp();

  const handleFavorite = async () => {
    try {
      await toggleFavorite(product.id, !product.favorite);
      onUpdate();
      showNotification(
        product.favorite ? 'Removed from favorites' : 'Added to favorites',
        'success'
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showNotification('Error updating favorite', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteProduct(product.id);
        onUpdate();
        showNotification('Item deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting item', 'error');
      }
    }
  };

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="card-feminine overflow-hidden group">
        <div className="flex items-center p-4 space-x-4">
          {/* Compact Image */}
          <div className="relative w-16 h-16 flex-shrink-0 bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PhotoIcon className="w-6 h-6 text-rose-300" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-feminine-heading text-base font-medium truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {product.description || 'Sem descrição'}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-bold gold-accent">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={handleFavorite}
                  className="p-1.5 rounded-full hover:bg-rose-50 transition-colors duration-200"
                >
                  {product.favorite ? (
                    <HeartSolidIcon className="w-4 h-4 text-rose-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-rose-400 hover:text-rose-500" />
                  )}
                </button>
                <button
                  onClick={handleEdit}
                  className="p-1.5 rounded-full hover:bg-gray-50 transition-colors duration-200"
                >
                  <PencilIcon className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1.5 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <TrashIcon className="w-4 h-4 text-red-600" />
                </button>
                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors hover:underline decoration-rose-300 ml-2"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-feminine overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-rose-50 to-rose-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z"/>
            </svg>
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200"
        >
          {product.favorite ? (
            <HeartSolidIcon className="w-5 h-5 text-rose-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-rose-400 hover:text-rose-500" />
          )}
        </button>
        
        {/* Action Buttons - Show on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <PencilIcon className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
          >
            <TrashIcon className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      
      {/* Content */}
       <div className="p-5">
         <div className="flex items-start justify-between mb-3">
           <h3 className="text-feminine-heading text-lg line-clamp-2 flex-1">
             {product.name}
           </h3>
           <span className="ml-3 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 rounded-full whitespace-nowrap">
             {product.category}
           </span>
         </div>
         
         {product.description && (
           <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
             {product.description}
           </p>
         )}
         
         <div className="flex items-center justify-between">
           <span className="text-lg font-bold gold-accent">
             R$ {product.price.toFixed(2)}
           </span>
           <button
             onClick={() => router.push(`/products/${product.id}`)}
             className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors hover:underline decoration-rose-300"
           >
             Ver Detalhes
           </button>
         </div>
       </div>
     </div>
   );
 }