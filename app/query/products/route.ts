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
    const { seller_id, name, description, price, image_url, stock,  category } = await req.json();

    // Validate required fields
    if (!seller_id || !name || !description || !price || !image_url || !stock || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [products] = await sql`
      INSERT INTO products (seller_id, name, description, price, image_url, stock,  category)
      VALUES (${seller_id}, ${name}, ${description}, ${price}, ${image_url}, ${stock}, ${category})
      RETURNING *;
    `;

    return NextResponse.json(products, { status: 201 });

  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error instanceof SyntaxError ? "Invalid JSON format" : "Failed to create product" }, 
      { status: 500 }
    );
  }
}
