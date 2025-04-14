import { lora } from "@/app/ui/fonts"
import ProductCard from '@/app/ui/products/productCard';
import ReviewBoard from "../ui/reviews/reviewBoard";
import TopSellers from "../ui/sellers/topSellers";
import { fetchProducts } from "../lib/data";

export default async function Page () {
    const products = await fetchProducts()

    return (
        <main>
            <h1 className={`${lora.className} mb-4 text-xl md:text-[50px] after:content-['*']`}>Dashboard</h1>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Top 10 Sellers</h1>
                <div className="flex flex-row bg-gray-50 max-w-[90%] overflow-x-auto">
                    <TopSellers />
                </div>
            </div>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Our Products</h1>
                <div className="flex flex-row bg-gray-50 max-w-[90%] overflow-x-auto">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Our Reviews</h1>
                <div className="flex flex-row bg-gray-50 max-w-[90%] overflow-x-auto">
                    <ReviewBoard />
                </div>
            </div>
        </main>
    )
}