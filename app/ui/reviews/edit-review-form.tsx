'use client';

import { UserField, ReviewForm } from '@/app/lib/definitions';
import {
  StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReview, RevState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { UpdateReview, DeleteReview } from "./buttons";

export default function EditReviewForm({
  review,
  users,
}: {
  review: ReviewForm;
  users: UserField[];
}) {
  // Review
  const initialState: RevState = { message: null, errors: {} };
  const updateReviewWithId = updateReview.bind(null, review.id);
  const [state, formAction] = useActionState(updateReviewWithId, initialState);

  // show form
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div className='flex flex-row'>
        <UpdateReview parentState={isShown} setParentState={setIsShown}/>
        <DeleteReview id={review.id}/>
      </div>

      {isShown && <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">  
        {/* User */}
        <div>
          <input 
          id="productId" 
          name="productId" 
          type="text" 
          className="hidden" 
          defaultValue={review.product_id}
          aria-describedby="productId-error"/>
          <div id="productId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.productId &&
              state.errors.productId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <input 
          id="userId" 
          name="userId" 
          type="text" 
          className="hidden" 
          defaultValue={review.user_id}
          aria-describedby="userId-error"/>
          <div id="userId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <p>{users.filter((user) => user.id == review.user_id)[0].name}</p>
          </div>
          
          {/* Rating */}
          <div className="mb-4">
            <label htmlFor="rating" className="mb-2 block text-sm font-medium">
              Choose a Rating
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  step="1"
                  min="1"
                  max="5"
                  defaultValue={review.rating}
                  placeholder="Enter in whole numbers"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="rating-error"
                />
                <StarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="rating-error" aria-live="polite" aria-atomic="true">
              {state.errors?.rating &&
                state.errors.rating.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
              <label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Choose a Rating
              </label>
              <div className="relative mt-2 rounded-md">
              <div className="relative">
                  <textarea className="rounded-md border border-gray-200 py-2 pl-2 text-sm w-[100%]"
                  id="comment" 
                  name="comment" 
                  rows={10} 
                  aria-describedby="comment-error"
                  placeholder="Leave your review here"
                  defaultValue={review.comment}>
                  </textarea>
              </div>
              </div>
              <div id="comment-error" aria-live="polite" aria-atomic="true">
              {state.errors?.comment &&
                  state.errors.comment.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                  </p>
                  ))}
              </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`/dashboard/products/${review.product_id}`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Review</Button>
        </div>
      </form>}
    </>
    
  );
}
