// import Image from "next/Image"
import Link from "next/link";
import {  } from "@/app/lib/data";

interface SellerProps {
    seller : {
      id: string;
      name: string;
      email: string;
      shop_name: string;
      description?: string;
    };
}

export default async function SellerCard({ seller }: SellerProps) {
  return (
    <Link href={`/dashboard/sellers/${seller.id}`} className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition max-w-[250px]">              
        <h2 className="font-bold">{seller.name}</h2>
        {/* <Image 
            alt={seller.name} src={seller.image_url}
            width={300} 
            height={200} 
            className="rounded-md"
        /> */}
        <hr />
        <h3>{seller.email}</h3>  
        <h3>{seller.description}</h3>                     
    </Link>
  );
}