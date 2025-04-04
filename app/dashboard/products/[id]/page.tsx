import Image from "next/image";
import Link from "next/Link";
import { fetchProductById, fetchSellerName } from "@/app/lib/data";

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [product] = await Promise.all([
            fetchProductById(id),
    ]);

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg shadow-lg p-4 bg-white transition max-w-[1000px] md:flex-row">
            <Image 
                src={product.image_url} 
                alt={product.name} 
                width={300} 
                height={200} 
                className="rounded-md"
            />
            <div className="max-w-[500px] p-2 ml-auto">
                <h2 className="text-[2rem] font-bold mt-2 md: text-xl">{product.name}</h2>
                <Link href={`/dashboard/sellers/${product.seller_id}`}>by {fetchSellerName(product.seller_id)}</Link>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex flex-col justify-between items-center mt-3 md:flex-row">
                    <span className="text-xl font-semibold text-blue-600">${product.price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}