const users = [
  {
    id: '3f54dab7-fcf5-4d5b-ac89-a5bcc819be22',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
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
  },
  {
    id: "3f54dab7-fcf5-4d5b-ac89-a5bcc819be22",
    name: "User 3",
    email: "jane@example.com",
    password: "mypassword"
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
  },
  {
    id: "643c0b4e-49bf-4148-82eb-9c4c1fc7168a",
    name: "Lucas Gonzaga",
    email: "lucas@gonzaga.com",
    shop_name: "Lucas Crafts and Woodwork",
    description: "Lucas crafts and woodworks especially made for you"
  },
  {
    id: "fb76c65d-8983-42a7-b7bd-8107d77daecf",
    name: "Madeline Torres",
    email: "madeline@example.com",
    shop_name: "Madeline Handmade Gifts Shop",
    description: "Handmade gifts for everyone"
  },
  {
    id: "c2d88c8f-dbff-4d8b-a410-25519b1fe7e4",
    name: "William Smith",
    email: "william@example.com",
    shop_name: "William's Handmade Crafts and Gifts",
    description: "a handmade crafts for you"
  },
  {
    id: "fc840551-4241-4c04-b98b-aecb428dbcf8",
    name: "Anna Smith",
    email: "anna@smith.com",
    shop_name: "Anna's Artistry",
    description: "Unique paintings and art pieces"
  },
  {
    id: "3438b428-24a0-4f0c-a6db-503210a4d8ba",
    name: "Mark Johnson",
    email: "mark@johnson.com",
    shop_name: "Mark's Metalworks",
    description: "Handcrafted metal sculptures and decor"
  },
  {
    id: "9dfa6890-4490-473b-982a-d56867dda692",
    name: "Sophia Wilson",
    email: "sophia@wilson.com",
    shop_name: "Sophia's Knits",
    description: "Hand-knitted clothing and accessories"
  },
];

const products = [
  {
    id: 'd4e5f678-9012-3456-789a-bcdef1234567',
    seller_id: "b2c3d4e5-f678-9012-3456-789abcdef123",
    name: 'Handmade Vase',
    description: 'A beautiful ceramic vase',
    price: 25.99,
    image_url: '/images/handmade-vase.webp',
    stock: 10,
    category: 'Home Decor',
  },
  {
    id: 'e5f67890-1234-5678-9abc-def123456789',
    seller_id: "c3d4e5f6-7890-1234-5678-9abcdef12345",
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
  {
    id: "62751e39-24d1-43f4-bcd7-ae2fe2879be2",
    seller_id: "fc840551-4241-4c04-b98b-aecb428dbcf8",
    name: "Abstract Painting",
    description: "A vibrant abstract painting",
    price: "150.00",
    stock: 3,
    image_url: "/images/abstract-painting.png",
    category: "Art"
  },
];

const orders = [
  {
    id: "f6789012-3456-789a-bcde-f123456789ab",
    user_id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    seller_id: "b2c3d4e5-f678-9012-3456-789abcdef123",
    total_price: "99.99",
    status: "pending",
    created_at: "2025-03-27T22:02:11.973Z"
  },
  {
    id: "ddf43361-8b20-4fb1-bfd0-44185f4455c3",
    user_id: "3f54dab7-fcf5-4d5b-ac89-a5bcc819be22",
    seller_id: "fc840551-4241-4c04-b98b-aecb428dbcf8",
    total_price: "150.00",
    status: "pending",
    created_at: "2025-04-03T18:11:30.577Z"
  },
];

const reviews = [
  {
    id: '67890123-4567-89ab-cdef-123456789abc',
    product_id: "d4e5f678-9012-3456-789a-bcdef1234567",
    user_id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    rating: 5,
    comment: "Amazing quality!",
    created_at: "2025-03-27T22:10:12.036Z"
  },
  {
    id: "cc7a3fd0-c8b7-4515-8122-82b7fb6a4ef2",
    product_id: "636659c7-b6f3-49c0-aeb3-a49b452b32a5",
    user_id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    rating: 5,
    comment: "Love the bag",
    created_at: "2025-04-01T19:03:52.992Z"
  },
  {
    id: "dc3e81a0-233e-4e9b-a036-80683c016720",
    product_id: "62751e39-24d1-43f4-bcd7-ae2fe2879be2",
    user_id: "3f54dab7-fcf5-4d5b-ac89-a5bcc819be22",
    rating: 5,
    comment: "Beautiful artwork, love it",
    created_at: "2025-04-03T18:19:28.025Z"
  },
];

export { users, products, sellers, orders, reviews };
