import { fetchReviews, fetchReviewsByProductId } from "@/app/lib/data";
import ReviewCard from "./reviewCard";
import CreateReviewForm from "./create-review-form";
import { fetchUsers } from "@/app/lib/data";

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

type Props = {
  product_id?: string;
  showImages?: boolean;
  direction?: "row" | "col";
};

export default async function ReviewBoard({ product_id, showImages=true, direction="row" }: Props) {
  let reviews: Review[];
  const users = await fetchUsers();

  if (product_id) {
    reviews = await fetchReviewsByProductId(product_id);
    return (
    <>
      <CreateReviewForm id={product_id} users={users}/>
      <div className={`flex flex-${direction} mt-2`}>
        {reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} showImages={showImages}/>
        ))}
      </div>
    </>)
  } else {
    reviews = await fetchReviews();
    return (
    <>
      <div className={`flex flex-${direction}`}>
        {reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} showImages={showImages}/>
        ))}
      </div>
    </>)
  }
}
