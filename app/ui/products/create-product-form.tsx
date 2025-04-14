'use client'

import { UserField } from '@/app/lib/definitions';
import { createProduct, ProdState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import Link from "next/link"

export default function CreateProductForm ({ sellers }: {sellers: UserField[]}) {
    const initialState: ProdState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
            </label>
            <input
            id="name"
            name="name"
            type="text"
            placeholder="Product Name"  
            className="w-full p-2 border" 
            required 
            aria-describedby="name-error"/>
            <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
                Description
            </label>
            <textarea 
            id="description"
            name="description" 
            placeholder="Description"  
            className="w-full p-2 border" 
            required 
            aria-describedby="description-error"/>
            <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                    state.errors.description.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Price
            </label>
            <input
            id="price"
            name="price" 
            type="number" 
            step="0.01" 
            placeholder="Price"  
            className="w-full p-2 border" 
            required 
            aria-describedby="price-error"/>
            <div id="price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
                Image URL
            </label>
            <input
            id="image_url"
            name="image_url" 
            placeholder="Image URL" 
            className="w-full p-2 border" 
            required 
            aria-describedby="image_url-error"/>
            <div id="image_url-error" aria-live="polite" aria-atomic="true">
                {state.errors?.image_url &&
                    state.errors.image_url.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="stock" className="mb-2 block text-sm font-medium">
                Stock
            </label>
            <input
            id="stock"
            name="stock" 
            type="number" 
            placeholder="Stock" 
            className="w-full p-2 border" 
            required 
            aria-describedby="stock-error"/>
            <div id="stock-error" aria-live="polite" aria-atomic="true">
                {state.errors?.stock &&
                    state.errors.stock.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
                Category
            </label>
            <input
            id="category"
            name="category" 
            placeholder="Category" 
            className="w-full p-2 border" 
            required 
            aria-describedby="category-error"/>
            <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors?.category &&
                    state.errors.category.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <label htmlFor="sellerId" className="mb-2 block text-sm font-medium">
                Choose Seller
            </label>
            <select
                id="sellerId"
                name="sellerId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="sellerId-error"
                >
                <option value="" disabled>
                    Select a seller
                </option>
                {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>
                    {seller.name}
                    </option>
                ))}
            </select>
            <div id="sellerId-error" aria-live="polite" aria-atomic="true">
                {state.errors?.sellerId &&
                state.errors.sellerId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                    </p>
                ))}
            </div>
            
            <Link
                href={`/dashboard/products`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancel
            </Link>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create Product
            </button>
      </form>
    )
} 