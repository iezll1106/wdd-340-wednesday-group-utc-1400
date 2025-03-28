// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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

export type Order = {
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

export type ProductListItem = Omit<Product, 'description'>;

placeholder-data.ts
const users = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    name: 'User1',
    email: 'liezl@nextmail.com',
    password: '123456',
  },
];

const sellers = [
  {
    id: 'b2c3d4e5-f678-9012-3456-789abcdef123',
    name: 'Jose Carreon',
    email: 'jose@carreon.com',
    shop_name: 'Jose Crafts',
    description: 'Handmade crafts and decor',
  },
  {
    id: 'c3d4e5f6-7890-1234-5678-9abcdef12345',
    name: 'Grace Lim',
    email: 'grace@lim.com',
    shop_name: 'Grace Crafts and Woodworks',
    description: 'Custom wooden furniture and carvings',
  },
];

const products = [
  {
    id: 'd4e5f678-9012-3456-789a-bcdef1234567',
    seller_id: sellers[0].id,
    name: 'Handmade Vase',
    description: 'A beautiful ceramic vase',
    price: 25.99,
    image_url: '/images/handmade-vase.webp',
    stock: 10,
    category: 'Home Decor',
  },
  {
    id: 'e5f67890-1234-5678-9abc-def123456789',
    seller_id: sellers[1].id,
    name: 'Wooden Chair',
    description: 'A sturdy oak chair',
    price: 99.99,
    image_url: '/images/wooden-chair.avif',
    stock: 5,
    category: 'Furniture',
  },
];

const orders = [
  {
    id: 'f6789012-3456-789a-bcde-f123456789ab',
    user_id: users[0].id,
    seller_id: sellers[0].id,
    total_price: 99.99,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

const reviews = [
  {
    id: '67890123-4567-89ab-cdef-123456789abc',
    product_id: products[0].id,
    user_id: users[0].id,
    rating: 5,
    comment: 'Amazing quality!',
    created_at: new Date().toISOString(),
  },
];

export { users, products, sellers, orders, reviews };
