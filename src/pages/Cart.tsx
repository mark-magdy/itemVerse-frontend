
import React , {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, CartItem } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus, Minus, ArrowRight, ChevronLeft } from "lucide-react";
import Modal from "@/components/ui/modal" ;
import CreditCard from "@/components/CreditCard";
const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCheckout = () => {
    setModalOpen(true);
    // This would be replaced with a real checkout process
    toast({
      title: "Checkout process initiated",
      description: "This is just a demo. In a real app, you would be redirected to payment.",
    });

     
    // Simulate successful checkout
    // setTimeout(() => {
    //   // clearCart();
    //   // navigate("/");
    //   toast({
    //     title: "Purchase complete!",
    //     description: "Thank you for your purchase!",
    //   });
    // }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/items">
          <Button className="bg-marketplace-600 hover:bg-marketplace-700">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span className="text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow 
                key={item.id} 
                item={item} 
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
          
          <div className="mt-8 flex justify-between">
            <Link to="/items">
              <Button variant="outline" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => {
                clearCart();
                toast({
                  title: "Cart cleared",
                  description: "All items have been removed from your cart.",
                });
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CreditCard />
      </Modal>
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>0.00 EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{(totalPrice * 0.1).toFixed(2)} EGP</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{(totalPrice + totalPrice * 0.1).toFixed(2)} EGP</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-marketplace-600 hover:bg-marketplace-700"
              onClick={handleCheckout}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">We accept</h3>
            <div className="flex space-x-2">
              {/* Simple payment icons */}
              <div className="w-12 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-xs">VISA</div>
              <div className="w-12 h-8 bg-red-500 rounded text-white flex items-center justify-center text-xs">MC</div>
              <div className="w-12 h-8 bg-green-500 rounded text-white flex items-center justify-center text-xs">MEZA</div>
              <div className="w-12 h-8 bg-yellow-500 rounded text-white flex items-center justify-center text-xs">TELDA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemRow = ({ 
  item, 
  updateQuantity,
  removeItem
}: { 
  item: CartItem,
  updateQuantity: (id: string, quantity: number) => void,
  removeItem: (id: string) => void
}) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
      <Link to={`/items/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 rounded overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover" 
          />
        </div>
      </Link>
      
      <div className="ml-4 flex-grow">
        <Link to={`/items/${item.id}`}>
          <h3 className="font-medium text-lg hover:text-marketplace-600">{item.title}</h3>
        </Link>
        <p className="text-marketplace-600 font-medium">{item.price.toFixed(2)} EGP </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          className="w-16 text-center"
        />
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Cart;
