import Form from '@/app/ui/orders/purchase-form';
import Breadcrumbs from '@/app/ui/orders/breadcrumbs';
import { fetchProductById, fetchSellersBase, fetchUsers } from '@/app/lib/data';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Purchase',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product, users, sellers] = await Promise.all([
    fetchProductById(id),
    fetchUsers(),
    fetchSellersBase(),
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Order Product',
            href: `/dashboard/orders/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} users={users} sellers={sellers} />
    </main>
  );
}