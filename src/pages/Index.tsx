
import React , {useEffect} from "react";
import Hero from "../components/Hero";
import FeaturedItems from "../components/FeaturedItems";
import SearchBar from "../components/SearchBar";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import useFetchItems from "@/hooks/useFetchItems";
import { get } from "http";

const Index = () => {
  // Categories for the category section
  const categories = [
    { name: "Electronics", icon: "🖥️", link: "/items?category=electronics" },
    { name: "Clothing", icon: "👕", link: "/items?category=clothing" },
    { name: "Home & Garden", icon: "🏡", link: "/items?category=home" },
    { name: "Sports", icon: "⚽", link: "/items?category=sports" },
    { name: "Books", icon: "📚", link: "/items?category=books" },
    { name: "Collectibles", icon: "🏆", link: "/items?category=collectibles" },
  ];
//  useEffect(() => {
//     const fetchItems = async () => {
//       console.log("Index component mounted");
//       if (sessionStorage.getItem("allItems") === null) {
//         console.log("No items found in localStorage, fetching items...");
//         const items = await useFetchItems();
//         sessionStorage.setItem("allItems", JSON.stringify(items));
//         console.log(items); 
//       } else {
//         console.log("Items found in localStorage", sessionStorage.getItem("allItems"));
//       }
//     };

//     fetchItems();
//   }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Find What You're Looking For</h2>
          <div className="flex justify-center">
            <SearchBar className="w-full max-w-2xl" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                to={category.link} 
                key={category.name}
                className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <FeaturedItems />

      {/* Sell Your Items CTA */}
      <section className="py-16 bg-marketplace-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Items?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of sellers on ItemVerse and start earning by listing your items today.
          </p>
          <Link to="/sell">
            <Button size="lg" variant="secondary" className="bg-white text-marketplace-700 hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Selling
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
