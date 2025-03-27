import Image from "next/image";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition">
      <Image 
        src={product.imageUrl} 
        alt={product.name} 
        width={300} 
        height={200} 
        className="rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xl font-semibold text-blue-600">${product.price}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}