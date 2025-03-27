"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Seller = {
  id: string;
  name: string;
  storeName: string;
  profileImage: string;
};

const SellerList = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch("/api/sellers");
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) return <p>Loading sellers...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sellers.map((seller) => (
        <div key={seller.id} className="p-4 border rounded-lg shadow-md">
          <img src={seller.profileImage} alt={seller.name} className="w-16 h-16 rounded-full" />
          <h3 className="text-lg font-semibold">{seller.name}</h3>
          <p className="text-gray-600">{seller.storeName}</p>
          <Link href={`/sellers/${seller.id}`} className="text-blue-500 hover:underline">
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SellerList;
