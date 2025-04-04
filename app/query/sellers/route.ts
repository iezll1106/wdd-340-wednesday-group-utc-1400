import { NextResponse } from "next/server";
import postgres from "postgres";

// Create PostgreSQL client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Get all sellers
export async function GET() {
  try {
    const sellers = await sql`SELECT * FROM sellers;`;
    return NextResponse.json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 });
  }
}

// Create a new seller
export async function POST(req: Request) {
  try {
    const { name, email, shop_name, description } = await req.json();

    // Validate required fields
    if (!name || !email || !shop_name || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [seller] = await sql`
      INSERT INTO sellers (name, email, shop_name, description)
      VALUES (${name}, ${email}, ${shop_name}, ${description})
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

