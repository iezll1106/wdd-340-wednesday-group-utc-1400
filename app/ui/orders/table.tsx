// import Image from 'next/image';
import { UpdateOrder, DeleteOrder } from '@/app/ui/orders/buttons';
import OrderStatus from '@/app/ui/orders/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredOrders } from '@/app/lib/data';

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredOrders(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* check all the column names */}
          {/* <div>
            {orders.columns.map((col)=> (
              <p>{col.name}</p>
            ))}
          </div> */}
          <div className="md:hidden">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* Add a fecth to get the image url of the product */}
                      {/* <Image
                        src={order.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${order.name}'s profile picture`}
                      /> */}
                    </div>
                  </div>
                  <OrderStatus status={order.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(order.total_price)}
                    </p>
                    <p>{formatDateToLocal(order.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateOrder id={order.id} />
                    <DeleteOrder id={order.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Order Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Seller
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {order.id}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/*  fetch product image url */}
                      {/* <Image
                        src={"/customers/amy-burns.png"}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`{product.name}'s profile picture`}
                      /> */}
                      <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                      {order.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.seller_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(order.total_price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(order.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateOrder id={order.id} />
                      <DeleteOrder id={order.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
