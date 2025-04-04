import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

//Get all reviews
export async function GET() {
    try {
        const reviews = await sql`SELECT * FROM reviews;`;
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews"}, { status:500 });
    }
}

//Create a new review
export async function POST(req: Request) {
  try {
    const { product_id, user_id, rating, comment } = await req.json();

    // Validate required fields
    if (!product_id || !user_id || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [reviews] = await sql`
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES (${product_id}, ${user_id}, ${rating}, ${comment})
      RETURNING *;
    `;

    return NextResponse.json(reviews, { status: 201 });

  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: error instanceof SyntaxError ? "Invalid JSON format" : "Failed to create review" }, 
      { status: 500 }
    );
  }
}