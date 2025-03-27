import { NextApiRequest, NextApiResponse } from "next";

const sellers = [
  {
    id: "1",
    name: "Alice Johnson",
    storeName: "Alice's Handmade Goods",
    profileImage: "/images/sellers/alice.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    storeName: "Bob's Craft Shop",
    profileImage: "/images/sellers/bob.jpg",
  },
  {
    id: "3",
    name: "Clara Lee",
    storeName: "Clara's Artistry",
    profileImage: "/images/sellers/clara.jpg",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(sellers);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}