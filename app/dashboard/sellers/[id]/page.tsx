import Image from "next/image";
import { fetchSellerById } from "@/app/lib/data";

export default async function Page (props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [seller] = await Promise.all([
        fetchSellerById(id),
    ]);

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white transition max-w-[1000px]">              
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
        </div>
    )
}