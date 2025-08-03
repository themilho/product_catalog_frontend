export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  favorite: boolean;
  imageUrl?: string;
};