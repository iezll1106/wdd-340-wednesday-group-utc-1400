import Pagination from '@/app/ui/orders/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/orders/table';
import { CreateOrder } from '@/app/ui/orders/buttons';
import { lusitana } from '@/app/ui/fonts';
import { OrdersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchOrdersPages } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchOrdersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Orders</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search orderss..." />
        <CreateOrder />
      </div>
       <Suspense key={query + currentPage} fallback={<OrdersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}