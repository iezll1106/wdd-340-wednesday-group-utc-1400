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
        const { product_id, user_id, rating, comment} = await req.json();

        const [ reviews ] = await sql`
            INSERT INTO REVIEWS (product_id, user_id, rating, comment)
            VALUES (${product_id}, ${user_id}, ${rating}, ${comment})
            RETURNING *;
            `;
        return NextResponse.json(reviews, { status: 201 });

    } catch (error) {
        console.error("Error adding reviews:", error);
        return NextResponse.json({ error: "Failed to add review" }, { status: 500} );
    }
}