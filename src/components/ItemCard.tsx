
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  description?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  image,
  seller,
  description,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    addItem({ id, title, price, image });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/items/${id}`}>
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform hover:scale-105" 
          />
          <div className="absolute top-2 right-2">
            <span className="bg-white text-marketplace-700 text-sm font-medium px-2 py-1 rounded-full">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg truncate">{title}</h3>
          <p className="text-sm text-gray-500">by {seller}</p>
          {description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{description}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ItemCard;
