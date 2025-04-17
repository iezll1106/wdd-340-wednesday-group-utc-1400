import Image from "next/image"
import {formatDateToLocal} from "@/app//lib/utils";
import { fetchUsername, fetchProductInfo } from "@/app/lib/data";
import EditReviewForm from "./edit-review-form";
import { fetchUsers } from "@/app/lib/data";

interface ReviewProps {
    review: {
        id: string;
        product_id: string;
        user_id: string;
        rating: number;
        comment: string;
        created_at: string;
    };
    showImages?: boolean;
}

function StarRating (rating : number) {
    let starRating = ""
    
    for (let i = 0; i < rating; i++) {
        starRating+="⭐"
    }

    return starRating
}

export default async function ReviewCard({ review, showImages=true }: ReviewProps) {
    const product = await fetchProductInfo(review.product_id) 
    const users = await fetchUsers();

    if (showImages) {
        return (
            <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition min-w-[200px] max-w-[250px]">
                <Image 
                    alt={product.name} src={product.image_url}
                    width={300} 
                    height={200} 
                    className="rounded-md object-cover w-[300px] h-[200px]"
                />
                <h3>{product.name}</h3>
                <hr />
                <h2 className="font-bold">{fetchUsername(review.user_id)}</h2>
                <h3>{StarRating(review.rating)}</h3>
                <h3>{review.comment}</h3>
                <h4 className="text-red-400">{formatDateToLocal(review.created_at)}</h4>                      
            </div>
          );
    } else {
        return (
            <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition">
                <div>
                    <h2 className="font-bold">{fetchUsername(review.user_id)}</h2>
                    <h3>{StarRating(review.rating)}</h3>
                    <h3>{review.comment}</h3>
                    <h4 className="text-red-400">{formatDateToLocal(review.created_at)}</h4>
                </div>
                <EditReviewForm review={review} users={users}/>           
            </div>
          );
    }
}