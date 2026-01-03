"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  cost: number;
  category: string;
  description: string;
  active: boolean;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const response = await fetch("http://localhost:8000/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function searchItems() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/items/search?query=${search}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Items</h1>
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            placeholder="Search for items..."
          />
          <button
            onClick={searchItems}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Search
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Quantity</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Cost</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">${item.cost.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors duration-300 w-full block">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

