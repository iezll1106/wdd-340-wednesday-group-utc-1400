import Image from 'next/image';

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string; // Path to local image
    stock: number;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="relative w-full h-60">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          width={300} 
          height={300} 
          className="rounded-md object-cover"
        />
      </div>
      <h2 className="text-lg font-bold mt-3">{product.name}</h2>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-green-500 font-semibold mt-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
    </div>
  );
}
