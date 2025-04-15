import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteProduct } from '@/app/lib/actions';

export function DeleteProduct({ id, sellers_id }: { id: string, sellers_id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id, sellers_id);

  return (
    <form action={deleteProductWithId}>
      <button type="submit" 
      className="group flex flex-row rounded-md border-2 border-white p-2 mr-[0.5rem] 
      ml-auto mb-1 hover:bg-red-500 hover:border-red-500 w-[40px] hover:w-[100px]
      transition-all duration-500">
        <div className='w-[40px]'>
            <TrashIcon className="w-5 text-white" />
        </div>
        <span 
        className="opacity-0 group-hover:opacity-100 text-white transition-all 
        duration-500 delay-150">Delete</span>
      </button>
    </form>
  );
}
