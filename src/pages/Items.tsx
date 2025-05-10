
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetchItems from "@/hooks/useFetchItems";

// // Mock data for items
// const allItems = [
//   {
//     id: "1",
//     title: "Vintage Watch",
//     price: 149.99,
//     image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
//     seller: "VintageFinds",
//     description: "Classic vintage timepiece in excellent condition.",
//     category: "accessories",
//   },
//   {
//     id: "2",
//     title: "Modern Desk Lamp",
//     price: 59.99,
//     image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     seller: "ModernDecor",
//     description: "Sleek minimalist desk lamp with adjustable brightness.",
//     category: "home",
//   },
//   {
//     id: "3",
//     title: "Leather Messenger Bag",
//     price: 89.99,
//     image: "https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
//     seller: "LeatherGoods",
//     description: "Handcrafted genuine leather messenger bag for daily use.",
//     category: "accessories",
//   },
//   {
//     id: "4",
//     title: "Wireless Headphones",
//     price: 129.99,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     seller: "AudioTech",
//     description: "Premium wireless headphones with noise cancellation.",
//     category: "electronics",
//   },
//   {
//     id: "5",
//     title: "Ceramic Plant Pot",
//     price: 34.99,
//     image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
//     seller: "GreenHome",
//     description: "Handcrafted ceramic pot for indoor plants.",
//     category: "home",
//   },
//   {
//     id: "6",
//     title: "Mechanical Keyboard",
//     price: 79.99,
//     image: "https://images.unsplash.com/photo-1595044778792-33c0241a1eed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     seller: "TechGear",
//     description: "RGB mechanical keyboard with customizable switches.",
//     category: "electronics",
//   },
//   {
//     id: "7",
//     title: "Canvas Backpack",
//     price: 49.99,
//     image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     seller: "UrbanHiker",
//     description: "Durable canvas backpack for everyday use.",
//     category: "accessories",
//   },
//   {
//     id: "8",
//     title: "Smart Thermostat",
//     price: 119.99,
//     image: "https://images.unsplash.com/photo-1597765206558-6f4e94ffe8ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1193&q=80",
//     seller: "SmartHome",
//     description: "Energy-saving smart thermostat with WiFi connectivity.",
//     category: "electronics",
//   },
// ];



const Items = () => {
  // const [allItems,setAllItems] =  useState ([]); 
  if (localStorage.getItem("allItems") === null) {
      console.log("No items found in localStorage, fetching items...");
      localStorage.setItem("allItems", JSON.stringify(useFetchItems())); 
    }else{
      console.log("Items found in localStorage", localStorage.getItem("allItems"));
    }
  // console.log() )  ;
  const  allItems  = JSON.parse(localStorage.getItem("allItems")); // ✅ use returned state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortOption, setSortOption] = useState("newest");
  const [filteredItems, setFilteredItems] = useState(() => {
    return filterItems(allItems, initialSearchQuery, initialCategory, [0, 200], "newest");
  });

  function filterItems(items: typeof allItems, query: string, category: string, price: number[], sort: string) {
    let result = [...items];
    
    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by category
    if (category) {
      result = result.filter(item => item.category === category);
    }
    
    // Filter by price
    result = result.filter(item => 
      item.price >= price[0] && item.price <= price[1]
    );
    
    // Sort
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    // For "newest", we'll leave as is since we don't have date fields in our mock data
    
    return result;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newFiltered = filterItems(allItems, query, selectedCategory, priceRange, sortOption);
    setFilteredItems(newFiltered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newFiltered = filterItems(allItems, searchQuery, category, priceRange, sortOption);
    setFilteredItems(newFiltered);
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange);
    const newFiltered = filterItems(allItems, searchQuery, selectedCategory, newPriceRange, sortOption);
    setFilteredItems(newFiltered);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const newFiltered = filterItems(allItems, searchQuery, selectedCategory, priceRange, value);
    setFilteredItems(newFiltered);
  };

  const categories = [
    { value: "", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home & Garden" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Items</h1>
      
      {/* Search bar and filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4 lg:w-1/5 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.value || 'all'}`} 
                    checked={selectedCategory === category.value}
                    onCheckedChange={() => handleCategoryChange(category.value)}
                  />
                  <Label 
                    htmlFor={`category-${category.value || 'all'}`}
                    className="ml-2 cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 200]} 
                max={200} 
                step={5}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <SearchBar 
                placeholder="Search items..."
                className="w-full md:w-auto"
              />
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-sm font-medium">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
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
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="font-medium text-lg mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
