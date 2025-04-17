import postgres from 'postgres';
import {
  User,
  UserField,
  Seller,
  Order,
  Product,
  Review,
  FilteredOrder,
  FilteredProduct,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Users
export async function fetchUsername (id : string) {
  const data = await sql<User[]>`SELECT name FROM users WHERE id=${id} `;

  return data[0].name
};

export async function fetchUsers() {
  try {
    const customers = await sql<UserField[]>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

// Sellers
export async function fetchSellerName (id : string) {
  const data = await sql<User[]>`SELECT name FROM sellers WHERE id=${id} `;

  return data[0].name
};

export async function fetchSellers () {
  const data = await sql<Seller[]>`SELECT * FROM sellers`;

  return data
};

export async function fetchSellersBase() {
  try {
    const customers = await sql<UserField[]>`
      SELECT
        id,
        name
      FROM sellers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sellers.');
  }
}

export async function fetchSellerById (id : string) {
  const data = await sql<Seller[]>`SELECT * FROM sellers WHERE id=${id}`;

  return data[0]
};

export async function fetchTopSellers (amount: number) {
  const data = await sql<Seller[]>`SELECT * FROM sellers LIMIT ${amount}`;

  return data
};

// Products
export async function fetchProductById (id : string) {
  const data = await sql<Product[]>`SELECT * FROM products WHERE id=${id} `;

  return data[0]
};

export async function fetchProductInfo (id : string) {
  const data = await sql<Product[]>`SELECT name, image_url FROM products WHERE id=${id} `;

  return data[0]
};

export async function fetchProducts(): Promise<Product[]> {
  const rows = await sql<Product[]>`SELECT * FROM products ORDER BY id DESC;`;
  return rows;
};

export async function fetchProductsBySellerId(id: string): Promise<Product[]> {
  const rows = await sql<Product[]>`SELECT * FROM products WHERE seller_id=${id} ORDER BY id DESC;`;
  return rows;
};

export async function fetchFilteredProducts(
  query: string,
  min: number,
  max: number,
) {
  try {
    const orders = await sql<FilteredProduct[]>`
      SELECT
        (products.*),
        (sellers.name) seller_name,
        (sellers.shop_name)
      FROM products
      JOIN sellers ON products.seller_id = sellers.id
      WHERE
        (
          products.name ILIKE ${`%${query}%`} OR
          products.category ILIKE ${`%${query}%`} OR
          sellers.name ILIKE ${`%${query}%`} OR
          sellers.shop_name ILIKE ${`%${query}%`}
        ) 
        AND
        (
          products.price >= ${min} AND
          products.price <= ${max}
        )
      ORDER BY products.price DESC
    `;    

    return orders;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}

// Reviews
export async function fetchReviews () {
  const data = await sql<Review[]>`SELECT * FROM reviews`;

  return data
};

export async function fetchReviewsByProductId (id : string) {
  const data = await sql<Review[]>`SELECT * FROM reviews WHERE product_id=${id} `;

  return data
};

// Orders
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredOrders(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await sql<FilteredOrder[]>`
      SELECT
        (orders.*),
        (users.name),
        (sellers.name) seller_name
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN sellers ON orders.seller_id = sellers.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        sellers.name ILIKE ${`%${query}%`} OR
        orders.total_price::text ILIKE ${`%${query}%`} OR
        orders.created_at::text ILIKE ${`%${query}%`} OR
        orders.status ILIKE ${`%${query}%`}
      ORDER BY orders.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;    

    return orders;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}

export async function fetchOrdersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      orders.total_price::text ILIKE ${`%${query}%`} OR
      orders.created_at::text ILIKE ${`%${query}%`} OR
      orders.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchOrderById(id: string) {
  try {
    const data = await sql<Order[]>`
      SELECT
        *
      FROM orders
      WHERE orders.id = ${id};
    `;

    const order = data.map((order) => ({
      ...order,
      // Convert amount from cents to dollars
      amount: order.total_price / 100,
    }));

    return order[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
