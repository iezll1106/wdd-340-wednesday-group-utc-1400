import Link from 'next/link';
import ProductCard from './productCard';
import { Product } from '@/app/lib/definitions';

interface Props {
  products: Product[];
  scroll?: boolean;
  deletable?: boolean;
}

export default function ProductsBoard({products, scroll=false, deletable=false} : Props) {
  if (scroll) return (
    <div className="p-6">
      <div className="flex flex-row bg-gray-200 p-3 rounded-md overflow-x-auto gap-3">
        {products.length > 0 && products.map((product) => (
          <ProductCard key={product.id} product={product} deletable={deletable}/>
        ))}
        {products.length == 0 && <p className='m-3 text-[30px] text-gray-700'>Nothing to see here...</p>}
      </div>
    </div>
  )
  else return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:flex flex-wrap gap-6">
        {products.length > 0 && products.map((product) => (
          <ProductCard key={product.id} product={product} deletable={deletable}/>
        ))}
        {products.length == 0 && <p className='m-3 text-[30px] text-gray-700'>Nothing to see here...</p>}
      </div>
    </div>
  );
}
