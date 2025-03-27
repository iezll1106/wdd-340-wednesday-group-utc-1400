import Image from "next/image";

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    seller: {
      name: string;
      profileImage: string;
    };
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Image 
        src={product.imageUrl} 
        alt={product.name} 
        width={600} 
        height={400} 
        className="rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>

      <div className="flex items-center gap-4 mt-4">
        <Image 
          src={product.seller.profileImage} 
          alt={product.seller.name} 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <span className="text-gray-600">Sold by: <strong>{product.seller.name}</strong></span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-2xl font-semibold text-blue-600">${product.price}</span>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
}