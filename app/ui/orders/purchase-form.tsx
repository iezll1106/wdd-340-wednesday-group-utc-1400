'use client';

import { UserField, Product } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  TruckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createOrder, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function PurchaseForm({
  product,
  users,
  sellers,
}: {
  product: Product;
  users: UserField[];
  sellers: UserField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createOrder, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            User
          </label>
          <div className="relative">
            <select
              id="user"
              name="userId"
              aria-readonly
              className="peer block w-full cursor-pointer rounded-md border border-gray-100 py-2 pl-10 text-sm placeholder:text-gray-500"
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

        {/* Seller Name */}
        <div className="mb-4">
          <label htmlFor="seller" className="mb-2 block text-sm font-medium">
            Seller
          </label>
          <div className="relative">
            <select
              id="seller"
              name="sellerId"
              aria-readonly
              className="peer block w-full cursor-pointer rounded-md border border-gray-100 py-2 pl-10 text-sm placeholder:text-gray-500"
              defaultValue={product.seller_id}
              aria-describedby="seller-error"
            >
              <option value="" disabled>
                Select a seller
              </option>
              {sellers.filter((seller)=> product.seller_id == seller.id).map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="seller-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sellerId &&
              state.errors.sellerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Order Amount */}
        <div className="mb-4">
          <label htmlFor="total_price" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="total_price"
                name="total_price"
                type="number"
                step="0.01"
                readOnly
                defaultValue={product.price}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-100 py-2 pl-10 text-sm placeholder:text-gray-500"
                aria-describedby="total_price-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="total_price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.total_price &&
              state.errors.total_price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Order Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Order status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  checked
                  readOnly
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="shipped"
                  name="status"
                  type="radio"
                  value="shipped"
                  readOnly
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="shipped"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Shipped <TruckIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="delivered"
                  name="status"
                  type="radio"
                  value="delivered"
                  readOnly
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="delivered"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Delivered <CheckIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cancelled"
                  name="status"
                  type="radio"
                  value="cancelled"
                  readOnly
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="cancelled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Cancelled <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/products/${product.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Order</Button>
      </div>
    </form>
  );
}
