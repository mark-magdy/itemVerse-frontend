
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PurchaseItem {
  id: string;
  title: string;
  price: number;
  seller: string;
  image: string;
}

interface Purchase {
  id: string;
  date: string;
  items: PurchaseItem[];
  total: number;
  status: string;
}

interface PurchaseHistoryProps {
  purchases: Purchase[];
}

const PurchaseHistory = ({ purchases }: PurchaseHistoryProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Purchase History</h2>
      
      {purchases.map((order) => (
        <Card key={order.id} className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                Order #{order.id}
                <Badge className="ml-2" variant="outline">{order.status}</Badge>
              </CardTitle>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center py-2 border-b last:border-b-0">
                <div className="w-12 h-12 rounded overflow-hidden mr-3">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">Sold by: {item.seller}</p>
                </div>
                <div className="font-medium">${item.price.toFixed(2)}</div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <div className="font-bold">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {purchases.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't made any purchases yet.</p>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
