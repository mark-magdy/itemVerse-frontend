
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-marketplace-700">ItemVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/items" className="text-gray-700 hover:text-marketplace-700 transition-colors">
              Browse Items
            </Link>
            <Link to="/sell" className="text-gray-700 hover:text-marketplace-700 transition-colors">
              Sell
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-marketplace-700 transition-colors">
              About
            </Link>
          </div>

          {/* Search, Auth, and Cart - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{user?.name}</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-marketplace-600 hover:bg-marketplace-700">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-marketplace-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-marketplace-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/items" className="block py-2 text-gray-700 hover:text-marketplace-700">
              Browse Items
            </Link>
            <Link to="/sell" className="block py-2 text-gray-700 hover:text-marketplace-700">
              Sell
            </Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-marketplace-700">
              About
            </Link>
            <Link to="/search" className="block py-2 text-gray-700 hover:text-marketplace-700">
              Search
            </Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      <span>{user?.name}</span>
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full bg-marketplace-600 hover:bg-marketplace-700">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
