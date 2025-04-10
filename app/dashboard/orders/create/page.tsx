import Form from '@/app/ui/orders/create-form';
import Breadcrumbs from '@/app/ui/orders/breadcrumbs';
import { fetchSellersBase, fetchUsers } from '@/app/lib/data';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Orders',
};

export default async function Page() {
  const users = await fetchUsers();
  const sellers = await fetchSellersBase();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Create Order',
            href: '/dashboard/orders/create',
            active: true,
          },
        ]}
      />
      <Form users={users} sellers={sellers}/>
    </main>
  );
}