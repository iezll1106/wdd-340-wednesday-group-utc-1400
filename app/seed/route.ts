import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, products, sellers, orders, reviews } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      if (!user.password) {
        throw new Error(`Missing password for user with ID: ${user.id}`);
      }
  
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedSellers() {
  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      shop_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedSellers = await Promise.all(
    sellers.map((seller) => sql`
      INSERT INTO sellers (id, name, email, shop_name)
      VALUES (${seller.id}, ${seller.name}, ${seller.email}, ${seller.shop_name})
      ON CONFLICT (id) DO NOTHING;
    `)
  );

  return insertedSellers;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      seller_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      image_url VARCHAR(255),
      FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
    );
  `;

  const insertedProducts = await Promise.all(
    products.map((product) => sql`
      INSERT INTO products (id, seller_id, name, description, price, stock, image_url)
      VALUES (${product.id}, ${product.seller_id}, ${product.name}, ${product.description}, ${product.price}, ${product.stock}, ${product.image_url})
      ON CONFLICT (id) DO NOTHING;
    `)
  );

  return insertedProducts;
}

async function seedOrders() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      seller_id UUID NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
    );
  `;

  const insertedOrders = await Promise.all(
    orders.map((order) => sql`
      INSERT INTO orders (id, user_id, seller_id, total_price, status, created_at) -- Ensure created_at is handled
      VALUES (${order.id}, ${order.user_id}, ${order.seller_id}, ${order.total_price}, ${order.status}, DEFAULT)
      ON CONFLICT (id) DO NOTHING;
    `)
  );

  return insertedOrders;
}

async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      product_id UUID NOT NULL,
      user_id UUID NOT NULL,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (product_id, user_id) -- Prevent duplicate reviews by the same user
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map((review) => sql`
      INSERT INTO reviews (id, product_id, user_id, rating, comment, created_at) -- Ensure created_at is handled
      VALUES (${review.id}, ${review.product_id}, ${review.user_id}, ${review.rating}, ${review.comment}, DEFAULT)
      ON CONFLICT (id) DO NOTHING;
    `)
  );

  return insertedReviews;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedUsers(),
      seedSellers(),
      seedProducts(),
      seedOrders(),
      seedReviews(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}