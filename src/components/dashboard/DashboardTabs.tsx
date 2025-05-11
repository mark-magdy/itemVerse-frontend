import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, ShoppingCart, User, Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ListingForm from "./ListingForm";
import ListingsTable from "./ListingsTable";
import PurchaseHistory from "./PurchaseHistory";
import ProfileEditForm from "./ProfileEditForm";
import SellPageContent from "../SellPageContent";
import useFetchListings from "../../hooks/useFetchListings";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const DashboardTabs = ({ activeTab, setActiveTab, user }: DashboardTabsProps) => {
  const { items: userListings, purchases: purchaseHistory, loading, error } = useFetchListings();

  console.log("userListings in DashboardTabs", userListings);
  console.log("purchaseHistory in DashboardTabs", purchaseHistory);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-8">
        <TabsTrigger value="listings" className="flex items-center">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Your Listings
        </TabsTrigger>
        <TabsTrigger value="sell" className="flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Sell
        </TabsTrigger>
        <TabsTrigger value="purchases" className="flex items-center">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchase History
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="listings" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Listings</h2>
          <Dialog>
            <DialogTrigger asChild>
              {/* <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Listing</DialogTitle>
              </DialogHeader>
              {/* <div className="grid gap-4 py-4">
                <ListingForm />
              </div> */}
            </DialogContent>
          </Dialog>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ListingsTable listings={userListings} />
        )}
      </TabsContent>

      <TabsContent value="sell" className="space-y-6">
        <SellPageContent />
      </TabsContent>

      <TabsContent value="purchases" className="space-y-6">
        <h2 className="text-xl font-bold">Purchase History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <PurchaseHistory purchases={purchaseHistory} />
        )}
      </TabsContent>

      <TabsContent value="profile" className="space-y-6">
        <h2 className="text-xl font-bold">Your Profile</h2>
        <Card>
          <CardContent className="pt-6">
            <ProfileEditForm user={user} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

/*
const userListings = [
  {
    id: "101",
    title: "Vintage Camera",
    price: 199.99,
    status: "active",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    views: 24,
    created: "2023-04-15",
  },
  {
    id: "102",
    title: "Antique Clock",
    price: 149.99,
    status: "active",
    image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    views: 18,
    created: "2023-04-10",
  },
  {
    id: "103",
    title: "Vintage Record Player",
    price: 299.99,
    status: "sold",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    views: 52,
    created: "2023-03-28",
  }
];

// Mock data for purchase history
const purchaseHistory = [
  {
    id: "order-001",
    date: "2023-04-20",
    items: [
      {
        id: "201",
        title: "Wireless Earbuds",
        price: 79.99,
        seller: "AudioTech",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1188&q=80"
      }
    ],
    total: 79.99,
    status: "delivered"
  },
  {
    id: "order-002",
    date: "2023-04-05",
    items: [
      {
        id: "301",
        title: "Smart Watch",
        price: 149.99,
        seller: "TechGear",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
      },
      {
        id: "302",
        title: "Phone Case",
        price: 19.99,
        seller: "MobileAccessories",
        image: "https://images.unsplash.com/photo-1601593346740-925612772187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ],
    total: 169.98,
    status: "delivered"
  }
];
*/