import { useEffect, useState } from "react";
import { fetchItems } from "../api/item";

// Define the expected item structure
interface Item {
  id: number;
  title: string;
  price: number;
  image: string;
  seller: string;
  sellerAvatar: string;
  description: string;
  specifications: { label: string; value: string }[];
}

interface UseFetchItemsResult {
  items: Item[];
  loading: boolean;
  error: string;
}

const useFetchItems = (): UseFetchItemsResult => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  console.log("enter useFetchItems"); 
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetchItems();
        setItems(response.data);
        console.log("Items fetched successfully", response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  return { items, loading, error };
};

export default useFetchItems;
