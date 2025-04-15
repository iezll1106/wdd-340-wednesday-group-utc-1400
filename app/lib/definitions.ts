// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  shop_name: string;
  description?: string;
};

export type Product = {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
};

export type FilteredProduct = {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
  seller_name: string;
  shop_name: string;
};

export type Order = {
  id: string;
  user_id: string;
  seller_id: string;
  total_price: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
};

export type FilteredOrder = {
  id: string;
  user_id: string;
  seller_id: string;
  total_price: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  name: string;
  seller_name: string;
};

export type OrderForm = {
  id: string;
  user_id: string;
  seller_id: string;
  total_price: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ReviewForm = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ProductListItem = Omit<Product, 'description'>;