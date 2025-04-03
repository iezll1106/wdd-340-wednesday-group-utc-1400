import Image from "next/image";
import { fetchSellerName } from "@/app/lib/data";

interface ProductProps {
  product: {
    id: string;
    seller_id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition max-w-[250px]">
      <Image 
        src={product.image_url} 
        alt={product.name} 
        width={300} 
        height={200} 
        className="rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p>by {fetchSellerName(product.seller_id)}</p>
      <p className="text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xl font-semibold text-blue-600">${product.price}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}