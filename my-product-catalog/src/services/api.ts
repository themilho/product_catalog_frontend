import { Product } from "@/types/product";

const API_BASE_URL = "http://localhost:3002"; 

export const fetchProducts = async (favoritesOnly: boolean = false): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();
  return favoritesOnly ? products.filter((product: Product) => product.favorite) : products;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  try {
    // Garantir que o preço seja um número válido
    const validatedProduct = {
      ...product,
      price: typeof product.price === 'number' ? product.price : 0
    };

    console.log('Enviando produto para API:', validatedProduct);
    console.log('URL da API:', `${API_BASE_URL}/products/new`);

    const response = await fetch(`${API_BASE_URL}/products/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedProduct),
    });

    console.log('Resposta da API:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Dados do erro:', errorData);
      throw new Error(errorData?.message || 'Failed to create product');
    }
    
    const result = await response.json();
    console.log('Produto criado com sucesso:', result);
    return result;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product with id ${id}`);
  }
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product with id ${id}`);
  }
};

export const toggleFavorite = async (id: number, favorite: boolean): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favorite }),
  });
  if (!response.ok) {
    throw new Error(`Failed to toggle favorite for product with id ${id}`);
  }
  return response.json();
};