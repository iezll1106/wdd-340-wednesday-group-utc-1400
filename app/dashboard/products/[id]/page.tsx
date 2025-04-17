import Image from "next/image";
import Link from "next/link";
import { fetchProductById, fetchSellerName } from "@/app/lib/data";
import ReviewBoard from "@/app/ui/reviews/reviewBoard";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Product',
};

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [product] = await Promise.all([
            fetchProductById(id),
    ]);

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg shadow-lg p-4 bg-white transition max-w-[1000px] ">
            <Link href={`/dashboard/products/${id}/edit`} className="bg-green-600 text-white px-4 py-2 rounded ml-auto mb-2 w-[fit-content] hover:bg-green-700">
                Edit Product
            </Link>
            <div className="flex flex-col mx-auto md:flex-row md:mx-0">
                <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    width={300} 
                    height={200} 
                    className="rounded-md object-cover h-[350px] w-[450px] md:w-[300px] md:h-[200px]"
                />
                <div className="max-w-[500px] p-2 md:ml-auto">
                    <h2 className="text-[2rem] font-bold mt-2 md: text-xl">{product.name}</h2>
                    <Link href={`/dashboard/sellers/${product.seller_id}`}>by {fetchSellerName(product.seller_id)}</Link>
                    <p className="text-gray-800">Category: <span className="bg-green-600 py-1 px-2 w-[fit-content] rounded-md text-white">{product.category}</span></p>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex flex-col justify-between items-center mt-3 md:flex-row">
                        <span className="text-xl font-semibold text-blue-600">${product.price}</span>
                        <Link className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" href={`/dashboard/orders/${product.id}/purchase`}>
                            Order Product
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="mt-2 mb-2"/>
            <ReviewBoard product_id={product.id} showImages={false} direction="col"/>
        </div>
    )
}