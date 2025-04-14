'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    stock: '',
    category: '',
    seller_id: '', // Get this from context or session
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      }),
    });

    if (res.ok) {
      router.push('/dashboard/products'); 
    } else {
      console.error('Failed to create product');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full p-2 border" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border" required />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 border" required />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="w-full p-2 border" required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full p-2 border" required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 border" required />
        <input name="seller_id" placeholder="Seller ID" value={form.seller_id} onChange={handleChange} className="w-full p-2 border" required />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Product
        </button>
      </form>
    </div>
  );
}
