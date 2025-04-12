import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteReview } from '@/app/lib/actions';

export function CreateReview({ id }: { id: string }) {
  return (
    //
    <button type="submit" 
    className="flex h-10 justify-center items-center mr-auto rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="">Leave Review</span>
        <PlusIcon className="w-5" />
    </button>
  );
}

export function UpdateReview() {
  return (
    <button type="submit" className="rounded-md border mx-[0.2rem] p-2 hover:bg-gray-100">
        <span className="sr-only">Edit</span>
        <PencilIcon className="w-5" />
    </button>
  );
}

export function DeleteReview({ id }: { id: string }) {
  const deleteReviewWithId = deleteReview.bind(null, id);

  return (
    <form action={deleteReviewWithId}>
      <button type="submit" className="rounded-md border p-2 mr-[0.5rem] hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
