import Image from "next/image"
import {formatDateToLocal} from "@/app//lib/utils";
import { fetchUsername, fetchProductInfo } from "@/app/lib/data";

interface ReviewProps {
    review: {
        id: string;
        product_id: string;
        user_id: string;
        rating: number;
        comment: string;
        created_at: string;
    };
}

function StarRating (rating : number) {
    let starRating = ""
    
    for (let i = 0; i < rating; i++) {
        starRating+="⭐"
    }

    return starRating
}

export default async function ReviewCard({ review }: ReviewProps) {
    const product = await fetchProductInfo(review.product_id)

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition max-w-[250px]">
        <Image 
            alt={product.name} src={product.image_url}
            width={300} 
            height={200} 
            className="rounded-md"
        />
        <h3>{product.name}</h3>
        <hr />
        <h2 className="font-bold">{fetchUsername(review.user_id)}</h2>
        <h3>{StarRating(review.rating)}</h3>
        <h3>{review.comment}</h3>
        <h4 className="text-red-400">{formatDateToLocal(review.created_at)}</h4>                       
    </div>
  );
}