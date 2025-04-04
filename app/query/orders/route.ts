import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

//Get all reviews
export async function GET() {
    try {
        const orders = await sql`SELECT * FROM orders;`;
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews"}, { status:500 });
    }
}

//Create a new review
export async function POST(req: Request) {
  try {
    const { user_id, seller_id, total_price, status } = await req.json();

    // Validate required fields
    if (!user_id || !seller_id || !total_price || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [seller] = await sql`
      INSERT INTO sellers (name, email, shop_name, description)
      VALUES (${user_id}, ${seller_id},  ${total_price}, ${status})
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