const users = [
  {
    id: crypto.randomUUID(),
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const sellers = [
  {
    id: crypto.randomUUID(),
    name: 'Jose Carreon',
    email: 'jose@carreon.com',
    shop_name: 'Jose Crafts',
    description: 'Handmade crafts and decor',
  },
  {
    id: crypto.randomUUID(),
    name: 'Grace Lim',
    email: 'grace@lim.com',
    shop_name: 'Grace Crafts and Woodworks',
    description: 'Custom wooden furniture and carvings',
  },
];

const products = [
  {
    id: crypto.randomUUID(),
    seller_id: sellers[0].id,
    name: 'Handmade Vase',
    description: 'A beautiful ceramic vase',
    price: 25.99,
    image_url: 'https://ephraimpottery.com/product/skyflower-vase/#iLightbox[product-gallery]/1',
    stock: 10,
    category: 'Home Decor',
  },
  {
    id: crypto.randomUUID(),
    seller_id: sellers[1].id,
    name: 'Wooden Chair',
    description: 'A sturdy oak chair',
    price: 99.99,
    image_url: 'https://woodenbazar.com/products/wood-grandpa-rocking-chair-baby-rocking-chair-fir-kids-ing-chair#images-1',
    stock: 5,
    category: 'Furniture',
  },
];

const orders = [
  {
    id: crypto.randomUUID(),
    user_id: users[0].id,
    seller_id: sellers[0].id,
    total_price: 99.99,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

const reviews = [
  {
    id: crypto.randomUUID(),
    product_id: products[0].id,
    user_id: users[0].id,
    rating: 5,
    comment: 'Amazing quality!',
    created_at: new Date().toISOString(),
  },
];

export { users, products, sellers, orders, reviews };
