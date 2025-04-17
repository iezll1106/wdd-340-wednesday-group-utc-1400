// import Image from "next/image";
import { fetchSellerById, fetchProductsBySellerId } from "@/app/lib/data";
import ProductCard from "@/app/ui/products/productCard";
import Link from "next/link"
import ProductsBoard from "@/app/ui/products/productsBoard";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Seller',
};

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [seller, products] = await Promise.all([
        fetchSellerById(id),
        fetchProductsBySellerId(id)
    ]);

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white transition max-w-[1000px]">              
            <h2 className="font-bold text-[50px]">{seller.name}</h2>
            {/* <Image 
                alt={seller.name} src={seller.image_url}
                width={300} 
                height={200} 
                className="rounded-md"
            /> */}
            <hr />
            <h3>{seller.email}</h3>  
            <h3 className="mb-2">{seller.description}</h3>
            <Link href="/dashboard/products/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                + Add Product
            </Link>
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <ProductsBoard products={products} scroll={true} deletable={true}/>
        </div>
    )
}