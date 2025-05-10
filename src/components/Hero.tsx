
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-marketplace-100 to-marketplace-200 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Buy & Sell Unique Items
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Join thousands of users on ItemVerse, the premier marketplace
              for buying and selling unique items from around the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/items">
                <Button size="lg" className="bg-marketplace-600 hover:bg-marketplace-700">
                  Browse Items
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="outline">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                    alt="Watch"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1611930022073-84f3c373f6e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="Sneakers"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Furniture"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1637634229768-0ef084e2b4a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt="Headphones"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
