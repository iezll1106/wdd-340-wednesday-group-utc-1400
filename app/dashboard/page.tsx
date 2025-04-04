import { lora } from "@/app/ui/fonts"
import ProductCard from '@/app/ui/products/productCard';
import ReviewCard from "../ui/reviews/reviewCard";
import SellerCard from '@/app/ui/sellers/sellersCard'
import { products, reviews, sellers } from "@/app/lib/placeholder-data";
import ReviewBoard from "../ui/reviews/reviewBoard";
import TopSellers from "../ui/sellers/topSellers";

export default async function Page () {
    return (
        <main>
            <h1 className={`${lora.className} mb-4 text-xl md:text-[50px] after:content-['*']`}>Dashboard</h1>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Top 10 Sellers</h1>
                <TopSellers />
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
                <ReviewBoard />
            </div>
        </main>
    )
}