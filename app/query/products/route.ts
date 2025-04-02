import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Get all products
export async function GET() {
  try {
    const products = await sql`SELECT * FROM products;`;
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Create a new product
export async function POST(req: Request) {
  try {
    const { seller_id, name, description, price, stock, category, image_url } = await req.json();

    const [product] = await sql`
      INSERT INTO products (seller_id, name, description, price, stock, category, image_url)
      VALUES (${seller_id}, ${name}, ${description}, ${price}, ${stock}, ${category}, ${image_url})
      RETURNING *;
    `;

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

