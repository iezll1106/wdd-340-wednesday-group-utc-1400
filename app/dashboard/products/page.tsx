import ProductCard from '@/app/ui/products/productCard';
import { fetchFilteredProducts } from '@/app/lib/data';
import Filters from '@/app/ui/filters';
import Link from 'next/link';
import ProductsBoard from '@/app/ui/products/productsBoard';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'All Products',
};

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    query?: string;
    min?: number;
    max?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const min = searchParams?.min || 0;
  const max = searchParams?.max || 999999999999999;
  const products = await fetchFilteredProducts(query, min, max);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <Link href="/dashboard/products/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Product
        </Link>
      </div>
      <Filters />
      <ProductsBoard products={products}/>
    </div>
  );
}