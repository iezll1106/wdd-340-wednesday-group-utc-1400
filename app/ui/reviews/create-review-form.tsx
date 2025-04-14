'use client';

import { UserField } from '@/app/lib/definitions';
import {
  UserCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createReview, RevState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { CreateReview } from "./buttons";

export default function CreateReviewForm({
  id,
  users,
}: {
  id: string;
  users: UserField[];
}) {
  // Review
  const initialState: RevState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);

  // show form
  const [isShown, setIsShown] = useState(false);
  
  return (
    <>
      <div>
        <CreateReview parentState={isShown} setParentState={setIsShown}/>
      </div>

      {isShown && <form action={formAction}>
        <input 
        id="productId" 
        name="productId" 
        type="text" 
        defaultValue={id} 
        className="hidden"
        aria-describedby="productId-error"/>
        <div id="productId-error" aria-live="polite" aria-atomic="true">
          {state.errors?.productId &&
            state.errors.productId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* User Name */}
          <div className="mb-4">
            <label htmlFor="user" className="mb-2 block text-sm font-medium">
              Choose user
            </label>
            <div className="relative">
              <select
                id="user"
                name="userId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="user-error"
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
              {state.errors?.userId &&
                state.errors.userId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
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

          {/* Review */}
          <div className="mb-4">
              <label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Write the Review
              </label>
              <div className="relative mt-2 rounded-md">
              <div className="relative">
                  <textarea className="rounded-md border border-gray-200 py-2 pl-2 text-sm w-[100%]"
                  id="comment" 
                  name="comment" 
                  rows={10} 
                  aria-describedby="comment-error"
                  placeholder="Leave your review here"
                  >
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
            href={`/dashboard/products/${id}`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create</Button>
        </div>
      </form>}
    </>
  );
}
