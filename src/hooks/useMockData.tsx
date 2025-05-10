
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define types
interface UserStats {
  itemsListed: number;
  itemsSold: number;
  totalSales: string;
  totalPurchases: string;
}

interface CategoryStats {
  [key: string]: number;
}

interface ListingData {
  id?: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  condition?: string;
  images?: string[];
  location?: string;
  shipping?: string;
  status?: "active" | "sold" | "pending";
}

export const useMockData = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStats | null>(null);

  useEffect(() => {
    // Mock fetch user stats
    fetchUserStats();
    fetchCategoryStats();
  }, []);

  const fetchUserStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response
      const data: UserStats = {
        itemsListed: 6,
        itemsSold: 2,
        totalSales: "549.98",
        totalPurchases: "329.97"
      };
      
      setUserStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user stats:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to load user statistics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Mock response
      const data: CategoryStats = {
        electronics: 47,
        clothing: 38,
        "home & garden": 29,
        collectibles: 21,
        books: 15
      };
      
      setCategoryStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching category stats:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const createListing = async (listingData: ListingData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Creating new listing:", listingData);
      
      // Mock successful response
      const newListing = {
        ...listingData,
        id: `listing-${Date.now()}`,
        created: new Date().toISOString().split('T')[0],
        views: 0,
        status: "active"
      };
      
      setError(null);
      return newListing;
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive"
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateListing = async (id: string, listingData: Partial<ListingData>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log(`Updating listing ${id}:`, listingData);
      
      // Mock successful response
      const updatedListing = {
        id,
        ...listingData,
        updated: new Date().toISOString()
      };
      
      setError(null);
      return updatedListing;
    } catch (err) {
      console.error("Error updating listing:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to update listing. Please try again.",
        variant: "destructive"
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteListing = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log(`Deleting listing ${id}`);
      
      setError(null);
      return { success: true };
    } catch (err) {
      console.error("Error deleting listing:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive"
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock image URLs
      const mockImageUrls = [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      ];
      
      // Return a random image URL from the mock list
      const imageUrl = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];
      
      setError(null);
      return imageUrl;
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    userStats,
    categoryStats,
    createListing,
    updateListing,
    deleteListing,
    uploadImage,
  };
};
