import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, ShoppingCart } from "lucide-react";

interface UserStatsProps {
  userStats: {
    itemsListed?: number;
    itemsSold?: number;
    totalSales?: string;
    totalPurchases?: string;
  } | null;
  listingsCount?: number;
}

const UserStats = ({ userStats, listingsCount = 0 }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm text-gray-500">Items Listed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-marketplace-600" />
            <span className="text-2xl font-bold">{userStats?.itemsListed }</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm text-gray-500">Items Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-marketplace-600" />
            <span className="text-2xl font-bold">{userStats?.itemsSold }</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm text-gray-500">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <span className="text-2xl font-bold">{userStats?.totalSales} EGP</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm text-gray-500">Total Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <span className="text-2xl font-bold">{userStats?.totalPurchases } EGP</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
