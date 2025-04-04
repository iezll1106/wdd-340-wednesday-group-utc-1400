import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

//Get all orders
export async function GET() {
    try {
        const orders = await sql`SELECT * FROM orders;`;
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders"}, { status:500 });
    }
}

//Create a new order
export async function POST(req: Request) {
  try {
    const { user_id, seller_id, total_price, status } = await req.json();

    // Validate required fields
    if (!user_id || !seller_id || !total_price || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [orders] = await sql`
      INSERT INTO orders (user_id, seller_id, total_price, status)
      VALUES (${user_id}, ${seller_id},  ${total_price}, ${status})
      RETURNING *;
    `;

    return NextResponse.json(orders, { status: 201 });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error instanceof SyntaxError ? "Invalid JSON format" : "Failed to create order" }, 
      { status: 500 }
    );
  }
}