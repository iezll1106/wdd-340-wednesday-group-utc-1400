import SellerCard from '@/app/ui/sellers/sellersCard';
import { sellers } from "@/app/lib/placeholder-data";

export default function SellersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}