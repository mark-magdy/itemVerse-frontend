
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import ListingForm from "./ListingForm";

interface Listing {
  id: string;
  title: string;
  price: number;
  status: string;
  image: string;
  views: number;
  dateCreated: string;
  description?: string;
  category?: string;
}

interface ListingsTableProps {
  listings: Listing[];
}

const ListingsTable = ({ listings }: ListingsTableProps) => {
  const { toast } = useToast();
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Date Listed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3">
                    
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span>{listing.title}</span>
                </div>
              </TableCell>
              <TableCell>${listing.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                  {listing.status}
                </Badge>
              </TableCell>
              <TableCell>{listing.views}</TableCell>
              <TableCell>{listing.dateCreated}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Listing</DrawerTitle>
                      </DrawerHeader>
                      <div className="px-4 py-2 pb-6">
                        <ListingForm listing={listing} isEdit />
                      </div>
                    </DrawerContent>
                  </Drawer>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      toast({
                        title: "Listing deleted",
                        description: `${listing.title} has been removed from your listings.`,
                      });
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingsTable;
