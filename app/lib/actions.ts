'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

const CreateOrder = FormSchema.omit({ id: true, created_at: true });
const UpdateOrder = FormSchema.omit({ id: true, created_at: true });

export type State = {
  errors?: {
    userId?: string[];
    sellerId?: string[];
    total_price?: string[];
    status?: string[];
  };
  message?: string | null;
};

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