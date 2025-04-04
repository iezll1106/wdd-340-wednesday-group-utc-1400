import { fetchTopSellers } from "@/app/lib/data";
import SellerCard from "./sellersCard";

export default async function TopSellers () {
    const sellers = await fetchTopSellers(10);

    return (
        <div className={`flex flex-row`}>
            {sellers.map((seller) => (
                <SellerCard key={seller.id} seller={seller}/>
            ))}
        </div>
    )
}