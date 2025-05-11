
import React, {useState , useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import {getItemById} from "../api/item.ts"; 
import useFetchItems  from "../hooks/useFetchItems.ts";
// Mock data for a single item
// const items = [
//   {
//     id: "1",
//     title: "Vintage Watch",
//     price: 149.99,
//     image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
//     seller: "VintageFinds",
//     sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     description: "This authentic vintage timepiece is in excellent condition. Features include a stainless steel case, manual wind movement, and a genuine leather strap. Perfect for collectors or everyday wear.",
//     specifications: [
//       { label: "Brand", value: "Omega" },
//       { label: "Model", value: "Seamaster" },
//       { label: "Year", value: "1975" },
//       { label: "Condition", value: "Excellent" },
//       { label: "Movement", value: "Mechanical" },
//       { label: "Case Material", value: "Stainless Steel" }
//     ]      
//   },
//   // Add more items as needed
// ];


// async function xxx() {
//     try {
//       const res = await fetchItems();
//       console.log("Items fetched successfully", res.data);
      
//     } catch (err) {
//       console.error("Failed to fetch items", err);
//     }
//   }

const ItemDetail = () => {
  console.log("ItemDetail component rendered");
  // const { items, loading, error } = useFetchItems(); // ✅ use returned state
  // console.log("Fetched items:", items); // ✅ log the fetched items
//   const items = [
//   { id: 1, title: "Test", price: 99.99, image: "", seller: "", sellerAvatar: "", description: "", specifications: [] }
// ];


  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  // if (localStorage.getItem("allItems") === null) {
  //     console.log("No items found in localStorage, fetching items...");
  //     localStorage.setItem("allItems", JSON.stringify(useFetchItems())); 
  //   }else{
  //     console.log("Items found in localStorage", localStorage.getItem("allItems"));
  //   }

  // console.log() )  ;
  const  items  = JSON.parse(localStorage.getItem("allItems")); // ✅ use returned state
  const { addItem } = useCart();
  const { toast } = useToast();

  // if (loading) return <div className="text-center py-20">Loading...</div>;
  // if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  const { id } = useParams<{ id: string }>();
  const item = items.find((item) => item.id === Number(id));
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
        <p className="mb-8">The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/items">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Items
          </Button>
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem({
      id: String(item.id),
      title: item.title,
      price: item.price,
      image: item.image
    });
    
    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart.`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/items" className="inline-flex items-center text-marketplace-600 hover:text-marketplace-700 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all items
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Item Image */}
        <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
          <img 
            // src={item.image||"./images/item-def.png"} 
            src={"../../public/images/item-def.png"} 
            
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Item Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <div className="flex items-center mb-4">
            <p className="text-2xl font-semibold text-marketplace-700">{item.price.toFixed(2)} EGP</p>
          </div>
          <div className="flex items-center mb-6">
            <img 
              src={item.sellerAvatar} 
              alt={item.seller} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>Sold by <Link to="#" className="text-marketplace-600 hover:underline">{item.seller}</Link></span>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {item.specifications.map((spec, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-marketplace-600 hover:bg-marketplace-700 text-lg py-6"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> 
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Similar Items Section would go here */}
    </div>
  );
};

export default ItemDetail;
