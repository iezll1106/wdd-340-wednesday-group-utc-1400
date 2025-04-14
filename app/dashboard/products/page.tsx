import Link from 'next/link';
import ProductCard from '@/app/ui/products/productCard';
import { fetchFilteredProducts, fetchProducts } from '@/app/lib/data';

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <Link href="/dashboard/products/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Product
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
