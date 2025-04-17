'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Search from './search';

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((name, term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)
  
  return (
    <div className="relative flex flex-col">
        <div className='mb-2'>
            <h2 className='mb-2 font-bold text-gray-700'>Search Products</h2>
            <Search placeholder='... by product name, category, seller name & shop name...'/>
        </div>
        <div className='my-3 flex flex-col'>
            <h2 className='mb-2 font-bold text-gray-700'>Filters</h2>
            <div>
            <label htmlFor="min-range">Min Range</label>
            <input 
            id='min-range' 
            type="number" 
            className="border border-gray-200 bg-white rounded-md p-2 mx-2" 
            step={0.01} 
            min={0} 
            placeholder='set Minimum price'
            onChange={(e) => {
                handleSearch('min', e.target.value)
            }}
            defaultValue={searchParams.get('min')?.toString()}
            />

            <label htmlFor="max-range">Max Range</label>
            <input 
            id='max-range' 
            type="number" 
            className="border border-gray-200 bg-white rounded-md p-2 mx-2" 
            step={0.01} 
            min={0} 
            placeholder='set Maximim price'
            onChange={(e) => {
                handleSearch('max', e.target.value)
            }}
            defaultValue={searchParams.get('max')?.toString()}
            />
            </div>
        </div>
    </div>
  );
}
