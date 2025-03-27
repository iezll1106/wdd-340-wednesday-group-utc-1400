"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Seller = {
  id: string;
  name: string;
  storeName: string;
  profileImage: string;
  bio: string;
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
  }[];
};

const SellerProfile = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(`/api/sellers/${id}`);
        const data = await response.json();
        setSeller(data);
      } catch (error) {
        console.error("Error fetching seller:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  if (loading) return <p>Loading seller profile...</p>;
  if (!seller) return <p>Seller not found</p>;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <img src={seller.profileImage} alt={seller.name} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{seller.name}</h1>
          <p className="text-gray-600">{seller.storeName}</p>
          <p className="mt-2">{seller.bio}</p>
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {seller.products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProfile;