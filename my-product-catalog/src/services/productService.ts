import { Product } from '@/types/product';
import { fetchProductById, createProduct as apiCreateProduct, updateProduct as apiUpdateProduct } from './api';

export const fetchProduct = async (id: string): Promise<Product> => {
  return await fetchProductById(parseInt(id));
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  return await apiCreateProduct(productData);
};

export const updateProduct = async (id: string, productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  return await apiUpdateProduct(parseInt(id), productData);
};