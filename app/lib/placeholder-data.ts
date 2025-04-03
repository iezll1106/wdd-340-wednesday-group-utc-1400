const users = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    name: 'User1',
    email: 'liezl@nextmail.com',
    password: '123456',
  },
  {
    id: "924ab565-24a9-493b-9738-4cb93d501f37",
    name: "User 2",
    email: "john@example.com",
    password: "password123",
  }
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
  {
    id: "4b390fe3-29b3-42fe-82c9-f7456d359a03",
    name: "Jane Libra",
    email: "jane@example.com",
    shop_name: "Jane’s Handmade Gifts",
    description: "a handmade gifts for everyday use"
  },
  {
    id: "267ac3f4-3afb-47b0-962e-f9f16675cd6c",
    name: "Lindsay Horan",
    email: "lindsay@example.com",
    shop_name: "Lindsay Handmade Crafts and Gifts Shop",
    description: "a handmade handcraft made by Lindsay"
  }
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
  {
    id: "930c3f02-5449-4d61-b1d2-929644ff8059",
    seller_id: "4b390fe3-29b3-42fe-82c9-f7456d359a03",
    name: "Handmade Ceramic Mug",
    description: "A beautifully designed ceramic mug",
    price: "15.99",
    stock: 20,
    image_url: "/images/mug.jpg",
    category: "Home Decor"
  },
  {
    id: "636659c7-b6f3-49c0-aeb3-a49b452b32a5",
    seller_id: "267ac3f4-3afb-47b0-962e-f9f16675cd6c",
    name: "Handmade Bag",
    description: "A beautifully designed handmade bag for all occasion",
    price: "65.99",
    stock: 1,
    image_url: "/images/handmade-bag2.jpeg",
    category: "Accessories"
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
  {
    id: "cc7a3fd0-c8b7-4515-8122-82b7fb6a4ef2",
    product_id: "636659c7-b6f3-49c0-aeb3-a49b452b32a5",
    user_id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    rating: 5,
    comment: "Love the bag",
    created_at: "2025-04-01T19:03:52.992Z"
  }
];

export { users, products, sellers, orders, reviews };
