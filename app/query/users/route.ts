import { NextResponse } from "next/server";
import postgres from "postgres";

// Create PostgreSQL client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Get all users
export async function GET() {
  try {
    const users = await sql`SELECT * FROM users;`;
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// Create a new users
export async function POST(req: Request) {
  try {
    const { name, email, password} = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into the database
    const [users] = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
      RETURNING *;
    `;

    return NextResponse.json(users, { status: 201 });

  } catch (error) {
    console.error("Error creating users:", error);
    return NextResponse.json(
      { error: error instanceof SyntaxError ? "Invalid JSON format" : "Failed to create user" }, 
      { status: 500 }
    );
  }
}