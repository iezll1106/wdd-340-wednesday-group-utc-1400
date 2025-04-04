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
    if (!name || !seller_id || !name || !description || !price || !image_url || !stock || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [seller] = await sql`
      INSERT INTO sellers (name, email, shop_name, description)
      VALUES (${seller_id}, ${name}, ${description}, ${price}, ${image_url}, ${stock}, ${category})
      RETURNING *;
    `;

    return NextResponse.json(seller, { status: 201 });

  } catch (error) {
    console.error("Error creating seller:", error);
    return NextResponse.json(
      { error: error instanceof SyntaxError ? "Invalid JSON format" : "Failed to create seller" }, 
      { status: 500 }
    );
  }
}
