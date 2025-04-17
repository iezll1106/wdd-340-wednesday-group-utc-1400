// dashboard/products/new/page.tsx

import CreateProductForm from '@/app/ui/products/create-product-form';
import { fetchSellersBase } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Add Product',
};

export default async function NewProductPage() {
  const sellers = await fetchSellersBase()

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <CreateProductForm sellers={sellers}/>
    </div>
  );
}
