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
        const {  user_id, seller_id, total_price, status} = await req.json();

        const [ reviews ] = await sql`
            INSERT INTO REVIEWS (user_id, seller_id, total_price, status)
            VALUES (${user_id}, ${seller_id},  ${total_price}, ${status})
            RETURNING *;
            `;
        return NextResponse.json(reviews, { status: 201 });

    } catch (error) {
        console.error("Error adding reviews:", error);
        return NextResponse.json({ error: "Failed to add review" }, { status: 500} );
    }
}