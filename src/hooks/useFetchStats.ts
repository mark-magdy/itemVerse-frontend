import { useEffect, useState } from "react";
import { getAllStats } from "../api/user";

interface UserStats {
  itemsListed: number;
  itemsSold: number;
  totalSales: string;
  totalPurchases: string;
}
// Return type can be UserStats | null to handle loading state
const useFetchStats = (): UserStats | null => {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const id = localStorage.getItem("userId");
        if (!id) throw new Error("UserId not found in localStorage");

        const response = await getAllStats(id);

        const data: UserStats = {
          itemsListed: response.data.totalItems,
          itemsSold: response.data.soldItems,
          totalSales: response.data.totalMoney,
          totalPurchases: response.data.totalpurchases,
        };
        
        setStats(data);
        console.log("Stats fetched successfully", data);
      } catch (err: any) {
        console.error("Error fetching stats:", err.message);
      }
    };

    getStats();
  }, []);

  return stats; // Will be null initially
};

export default useFetchStats;
