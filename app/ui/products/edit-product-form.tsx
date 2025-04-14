'use client'

import { UserField, Product } from '@/app/lib/definitions';
import { updateProduct, ProdState } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from "next/link"

export default function EditProductForm ({ id, product, sellers }: {id: string, product:  Product,  sellers: UserField[]}) {
    const initialState: ProdState = { message: null, errors: {} };
    const updateProductWithId = updateProduct.bind(null, id);
    const [state, formAction] = useActionState(updateProductWithId, initialState);

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
            defaultValue={product.name}
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
            defaultValue={product.description}
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
            defaultValue={product.price}
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
            defaultValue={product.image_url}
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
            defaultValue={product.stock}
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
            defaultValue={product.category}
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
                defaultValue={product.seller_id}
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
                {/* <option value={product.seller_id} selected>{sellers.filter((seller) => product.seller_id == seller.id)[0].name}</option> */}
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
                href={`/dashboard/products/${id}`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancel
            </Link>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Edit Product
            </button>
      </form>
    )
} 