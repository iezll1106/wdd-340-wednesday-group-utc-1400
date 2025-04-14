// dashboard/products/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSellersBase } from '@/app/lib/data';

export default function NewProductPage() {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    stock: '',
    category: '',
    seller_id: '',
  });

  useEffect(() => {
    const getSellersBase = async () => {
      const data = await fetchSellersBase();
      setSellers(data);
    };

    getSellersBase();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/query/products', {
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
        
        <select name="seller_id" value={form.seller_id} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Seller</option>
          {sellers.map((seller: any) => (
            <option key={seller.id} value={seller.id}>{seller.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Product
        </button>
      </form>
    </div>
  );
}
