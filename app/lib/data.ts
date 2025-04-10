import postgres from 'postgres';
import {
  User,
  UserField,
  Seller,
  Order,
  Product,
  Review,
  FilteredOrder,
} from './definitions';
import OrdersTable from '@/app/ui/orders/table'
import { Console } from 'console';
//import { number } from 'zod';
// import { formatCurrency } from './utils';

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

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw[]>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest invoices.');
//   }
// }

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? '0');
//     const numberOfCustomers = Number(data[1][0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
