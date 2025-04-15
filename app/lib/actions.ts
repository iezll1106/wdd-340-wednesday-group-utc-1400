'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  sellerId: z.string({
    invalid_type_error: 'Please select a seller.',
  }),
  total_price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'delivered', 'shipped', 'cancelled'], {
    invalid_type_error: 'Please select an order status.',
  }),
  created_at: z.string(),
});

const RevFormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  productId: z.string({
    invalid_type_error: 'Please select a product.',
  }),
  rating: z.coerce
    .number()
    .gt(0, { message: 'Please select a rating greater than 0.' }),
  comment: z.string({
    invalid_type_error: 'Please write the review.',
  }),
  created_at: z.string(),
});

const ProductFormSchema = z.object({
  id: z.string(),
  sellerId: z.string({
    invalid_type_error: 'Please select a seller.',
  }),
  name: z.string({
    invalid_type_error: 'Please write a name.',
  }),
  description: z.string({
    invalid_type_error: 'Please write a description.',
  }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  image_url: z.string(),
  stock: z.coerce
    .number(),
  category: z.string({
    invalid_type_error: 'Please write a catigory.',
  }),
});

const CreateOrder = FormSchema.omit({ id: true, created_at: true });
const UpdateOrder = FormSchema.omit({ id: true, created_at: true });

const CreateProduct = ProductFormSchema.omit({ id:true})
const UpdateProduct = ProductFormSchema.omit({ id:true})

const CreateReview = RevFormSchema.omit({ id: true, created_at: true });
const UpdateReview = RevFormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    userId?: string[];
    sellerId?: string[];
    total_price?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type RevState = {
  errors?: {
    userId?: string[];
    productId?: string[];
    rating?: string[];
    comment?: string[];
  };
  message?: string | null;
};

export type ProdState = {
  errors?: {
    sellerId?: string[];
    name?: string[];
    description?: string[];
    price?: string[];
    image_url?: string[];
    stock?: string[];
    category?: string[];
  };
  message?: string | null;
};

interface ProductProps {
    id: string;
    seller_id: string;
    name: string;
    description: string;
    price: number | string;
    image_url: string;
    stock: number;
    category: string;
}

export async function createOrder(prevState: State, formData: FormData) {
  const validatedFields = CreateOrder.safeParse({
    userId: formData.get('userId'),
    sellerId: formData.get('sellerId'),
    total_price: formData.get('total_price'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Order.',
    };
  }

  const { userId, sellerId, total_price, status } = validatedFields.data;
  const amountInCents = total_price * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO orders (user_id, seller_id, total_price, status, created_at)
      VALUES (${userId}, ${sellerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error('Database Error:', error); // Now logging the error
    return {
      message: 'Database Error: Failed to Create Order.',
    };
  }

  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}

export async function updateOrder(
  id: string, 
  prevState: State, 
  formData: FormData
) {
  const validatedFields = UpdateOrder.safeParse({
    userId: formData.get('userId'),
    sellerId: formData.get('sellerId'),
    total_price: formData.get('total_price'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { userId, sellerId, total_price, status } = validatedFields.data;
  const amountInCents = total_price * 100;
 
  await sql`
    UPDATE orders
    SET user_id = ${userId}, seller_id = ${sellerId}, total_price = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}

export async function deleteOrder(id: string) {
  await sql`DELETE FROM orders WHERE id = ${id}`;
  revalidatePath('/dashboard/orders');
}

// reviews
export async function createReview(prevState: RevState, formData: FormData) {
  const validatedFields = CreateReview.safeParse({
    userId: formData.get('userId'),
    productId: formData.get('productId'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Review.',
    };
  }

  const { userId, productId, rating, comment } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO reviews (user_id, product_id, rating, comment, created_at)
      VALUES (${userId}, ${productId}, ${rating}, ${comment}, ${date})
    `;
  } catch (error) {
    console.error('Database Error:', error); // Now logging the error
    return {
      message: 'Database Error: Failed to Create Review.',
    };
  }

  revalidatePath('/dashboard/products/'+productId);
  redirect('/dashboard/products/'+productId);
}

export async function updateReview(
  id: string, 
  prevState: RevState, 
  formData: FormData
) {
  const validatedFields = UpdateReview.safeParse({
    userId: formData.get('userId'),
    productId: formData.get('productId'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Review.',
    };
  }
  const { productId, rating, comment } = validatedFields.data;
 
  await sql`
    UPDATE reviews
    SET product_id = ${productId}, rating=${rating}, comment=${comment}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/products/'+productId);
  redirect('/dashboard/products/'+productId);
}

export async function deleteReview(id: string) {
  await sql`DELETE FROM reviews WHERE id = ${id}`;
  revalidatePath('/dashboard/products/'+id);
}

// product
export async function createProduct(prevState: ProdState, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    sellerId: formData.get('sellerId'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: formData.get('image_url'),
    stock: formData.get('stock'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { sellerId, name, description, price, image_url, stock, category } = validatedFields.data;
  // const amountInCents = price * 100;

  try {
    await sql`
      INSERT INTO products (seller_id, name, description, price, image_url, stock, category)
      VALUES (${sellerId}, ${name}, ${description}, ${price}, ${image_url}, ${stock}, ${category})
    `;
  } catch (error) {
    console.error('Database Error:', error); // Now logging the error
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(
  id: string, 
  prevState: ProdState, 
  formData: FormData) 
  {
  const validatedFields = UpdateProduct.safeParse({
    sellerId: formData.get('sellerId'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: formData.get('image_url'),
    stock: formData.get('stock'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { sellerId, name, description, price, image_url, stock, category } = validatedFields.data;
  // const amountInCents = price * 100;

  try {
    await sql`
      UPDATE products
      SET 
        seller_id = ${sellerId}, 
        name = ${name}, 
        description = ${description}, 
        price = ${price}, 
        image_url = ${image_url}, 
        stock = ${stock}, 
        category = ${category}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error); // Now logging the error
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard/products/'+id);
  redirect('/dashboard/products/'+id);
}

export async function deleteProduct(id: string, seller_id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard/sellers/'+seller_id);
}

// auth
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.error('Authentication Error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!name || !email || !password) return 'All fields are required.';

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error('Error creating user:', error);
    return 'Failed to create user. Email may already be in use.';
  }

  await signIn('credentials', formData);

  redirect('/dashboard');
}
