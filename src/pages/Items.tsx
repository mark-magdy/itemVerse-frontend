// src/pages/AllItems.tsx
import React, { useEffect, useState } from "react";
import { fetchItems } from "../api/item";
import ItemCard from "../components/ItemCard";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];

const AllItems: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data.data);
        localStorage.setItem("allItems", JSON.stringify (data.data) ); 
      } catch (e) {
        console.error("Failed to fetch items:", e);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };
    getAllItems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Items</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Decorative Filters Sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Price Range</h3>
            <Slider defaultValue={[20, 150]} max={200} step={5} disabled />
            <div className="flex justify-between text-sm mt-2 text-gray-500">
              <span>20 EGP</span>
              <span>150 EGP</span>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="w-full md:w-3/4">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllItems;
