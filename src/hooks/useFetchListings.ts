import { useEffect, useState } from "react";
import { getUserItems } from "../api/item";
import { getUserPurchases } from "../api/order";

interface ListingData {
  items: any[];      // you can replace `any` with a specific Item interface
  purchases: any[];  // likewise here
  loading: boolean;
  error: string | null;
}

const useFetchListings = (): ListingData => {
  const [items, setItems] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [itemsRes, purchasesRes] = await Promise.all([
          getUserItems(),
          getUserPurchases(),
        ]);
        setItems(itemsRes.data);
        setPurchases(purchasesRes.data);
        console.log("from hook items" , itemsRes); 
        console.log("from hook" , purchasesRes); 

      } catch (err: any) {
        console.error("Error fetching listings:", err);
        setError(err.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { items, purchases, loading, error };
};

export default useFetchListings;