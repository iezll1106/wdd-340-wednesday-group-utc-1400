import { fetchReviews, fetchReviewsByProductId } from "@/app/lib/data";
import ReviewCard from "./reviewCard";

interface Review {
    id: string;
    product_id: string;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

export default async function ReviewBoard({product_id} : any) {
    let reviews;
    if (product_id) {
        reviews = await fetchReviewsByProductId(product_id);
    } else {
        reviews = await fetchReviews();
    }

    return (
        <div className={`flex flex-row`}>
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review}/>
            ))}
        </div>)
}