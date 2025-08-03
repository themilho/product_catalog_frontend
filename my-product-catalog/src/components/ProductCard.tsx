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

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200"
        >
          {product.favorite ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
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
       <div className="p-4">
         <div className="flex items-start justify-between mb-2">
           <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
             {product.name}
           </h3>
           <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
             {product.category}
           </span>
         </div>
         
         {product.description && (
           <p className="text-sm text-gray-600 line-clamp-2 mb-3">
             {product.description}
           </p>
         )}
         
         <div className="flex items-center justify-between">
           <span className="text-lg font-bold text-gray-900">
             ${product.price.toFixed(2)}
           </span>
           <button
             onClick={() => router.push(`/products/${product.id}`)}
             className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
           >
             Ver Detalhes
           </button>
         </div>
       </div>
     </div>
   );
 }