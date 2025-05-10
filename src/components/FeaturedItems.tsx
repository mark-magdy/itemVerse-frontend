
import React from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock data for featured items
const featuredItems = [
  {
    id: "1",
    title: "Vintage Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    seller: "VintageFinds",
    description: "Classic vintage timepiece in excellent condition.",
  },
  {
    id: "2",
    title: "Modern Desk Lamp",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    seller: "ModernDecor",
    description: "Sleek minimalist desk lamp with adjustable brightness.",
  },
  {
    id: "3",
    title: "Leather Messenger Bag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    seller: "LeatherGoods",
    description: "Handcrafted genuine leather messenger bag for daily use.",
  },
  {
    id: "4",
    title: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    seller: "AudioTech",
    description: "Premium wireless headphones with noise cancellation.",
  },
];

const FeaturedItems: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
          <Link to="/items">
            <Button variant="outline" className="text-marketplace-700 border-marketplace-700 hover:bg-marketplace-50">
              View All Items
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <ItemCard 
              key={item.id} 
              id={item.id} 
              title={item.title} 
              price={item.price} 
              image={item.image} 
              seller={item.seller} 
              description={item.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
