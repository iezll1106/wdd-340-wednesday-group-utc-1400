import EditProductForm from '@/app/ui/products/edit-product-form';
import { fetchProductById, fetchSellersBase } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Edit Products',
};


export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
const params = await props.params;
const id = params.id;
const sellers = await fetchSellersBase()
const product = await fetchProductById(id)

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <EditProductForm id={id} product={product} sellers={sellers}/>
    </div>
  );
}