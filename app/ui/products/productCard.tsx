import Image from "next/image";
import Link from  "next/link";
import { fetchSellerName } from "@/app/lib/data";
import { DeleteProduct } from "./buttons";

interface ProductProps {
  product: {
    id: string;
    seller_id: string;
    name: string;
    description: string;
    price: number | string;
    image_url: string;
    stock: number;
    category: string;
  };
  deletable?: boolean
}

export default function ProductCard({ product, deletable }: ProductProps, ) {
  return (
    <div className="flex flex-col bg-gray-600 rounded-lg p-1">
      {deletable && 
        <DeleteProduct id={product.id} sellers_id={product.seller_id}/>
      }
      <Link className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg p-4 bg-white min-w-[250px] max-w-[250px] hover:shadow-xl transition" href={`/dashboard/products/${product.id}`}>
        <Image 
          src={product.image_url} 
          alt={product.name} 
          width={300} 
          height={200} 
          className="rounded-md object-cover w-[300px] h-[200px]"
        />
        <div className="mt-auto">
          <hr className="mt-2"/>
          <h3 className="text-lg font-bold mt-2">{product.name}</h3>
          <p>by {fetchSellerName(product.seller_id)}</p>
          <p className="text-gray-800">Category: <span className="bg-green-600 py-1 px-2 w-[fit-content] rounded-md text-white">{product.category}</span></p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xl font-semibold text-blue-600">${product.price}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Order Product 
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}