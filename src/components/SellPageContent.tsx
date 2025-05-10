
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useMockData } from "../hooks/useMockData";

interface ListingData {
  title: string;
  description?: string;
  price: number;
  category: string;
  condition?: string;
  location?: string;
  shipping?: string;
  images?: string[];
}

const SellPageContent = () => {
  const { toast } = useToast();
  const { categoryStats, createListing } = useMockData();
  
  const handleCreateListing = (formData: ListingData) => {
    createListing(formData).then(() => {
      toast({
        title: "Listing created",
        description: "Your listing has been created successfully.",
      });
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sell Your Items</h2>
          <p className="text-gray-500">Create and manage your listings</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Create New Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
            </DialogHeader>
            <ListingFormFull onSubmit={handleCreateListing} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Selling Tips</CardTitle>
            <CardDescription>How to create successful listings</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-marketplace-600 text-white flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">1</div>
                <span>Use high-quality photos from multiple angles</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-marketplace-600 text-white flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">2</div>
                <span>Write detailed, honest descriptions</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-marketplace-600 text-white flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">3</div>
                <span>Price competitively by researching similar items</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-marketplace-600 text-white flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">4</div>
                <span>Respond quickly to buyer questions</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-marketplace-600 text-white flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">5</div>
                <span>Ship items promptly after purchase</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Popular Categories</CardTitle>
            <CardDescription>Top selling categories right now</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {categoryStats ? (
                Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize">{category}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-marketplace-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, count * 10)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{count} items</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span>Electronics</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-marketplace-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-xs">47 items</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Clothing</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-marketplace-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-xs">38 items</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Home & Garden</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-marketplace-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-xs">29 items</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Collectibles</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-marketplace-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-xs">21 items</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">About Selling</CardTitle>
            <CardDescription>How our marketplace works</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-sm space-y-4">
              <p>
                Our marketplace connects buyers and sellers in a safe, easy-to-use
                environment. We handle the payment processing and provide tools to
                manage your listings.
              </p>
              <div className="flex items-start space-x-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Seller Protection</p>
                  <p className="text-amber-700 text-xs">
                    We protect legitimate sellers from fraudulent buyers and disputes.
                  </p>
                </div>
              </div>
              <p>
                <strong>Fees:</strong> We charge a 5% fee on each successful sale,
                with no listing fees.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ListingFormFullProps {
  onSubmit: (formData: ListingData) => void;
  listing?: {
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    condition?: string;
    location?: string;
    shipping?: string;
  };
}

const ListingFormFull = ({ onSubmit, listing }: ListingFormFullProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data: {[key: string]: any} = Object.fromEntries(formData.entries());
    
    // Basic validation
    const newErrors: {[key: string]: string} = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) newErrors.price = "Valid price is required";
    if (!data.category) newErrors.category = "Category is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add images to data and convert price to number
    const listingData: ListingData = {
      ...data,
      price: Number(data.price),
      images: images.length > 0 ? images : undefined,
      title: "",
      category: ""
    };
    
    if (onSubmit) {
      onSubmit(listingData);
    }
  };
  
  // Mock photo upload handler
  const handlePhotoUpload = () => {
    // Simulate file upload with mock images
    const mockImageUrls = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ];
    
    setImages([...images, ...mockImageUrls]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
            Item Title*
          </Label>
          <Input 
            id="title" 
            name="title"
            placeholder="What are you selling?" 
            defaultValue={listing?.title || ""} 
            className={errors.title ? "border-destructive" : ""}
          />
          {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea 
            id="description" 
            name="description"
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" 
            placeholder="Describe your item in detail. Include condition, features, etc." 
            defaultValue={listing?.description || ""}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price" className={errors.price ? "text-destructive" : ""}>
              Price ($)*
            </Label>
            <Input 
              id="price" 
              name="price"
              type="number" 
              placeholder="0.00" 
              min="0" 
              step="0.01"
              defaultValue={listing?.price || ""} 
              className={errors.price ? "border-destructive" : ""}
            />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
          </div>
          
          <div>
            <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>
              Category*
            </Label>
            <select 
              id="category" 
              name="category"
              className={`w-full rounded-md border ${errors.category ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm h-10`}
              defaultValue={listing?.category || ""}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="collectibles">Collectibles</option>
              <option value="toys">Toys & Games</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="books">Books & Media</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="condition">Condition</Label>
          <select 
            id="condition" 
            name="condition"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
            defaultValue={listing?.condition || "used_good"}
          >
            <option value="new">New</option>
            <option value="like_new">Like New</option>
            <option value="used_excellent">Used - Excellent</option>
            <option value="used_good">Used - Good</option>
            <option value="used_fair">Used - Fair</option>
          </select>
        </div>
        
        <div>
          <Label>Photos</Label>
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePhotoUpload}
              className="w-full border-dashed border-2 h-24 flex flex-col items-center justify-center"
            >
              <Plus className="h-6 w-6 mb-1" />
              <span>Add Photos</span>
              <span className="text-xs text-gray-500 mt-1">Up to 5 photos</span>
            </Button>
            
            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative w-full h-24 rounded overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-0 right-0 rounded-full bg-black/60 text-white h-6 w-6 p-1"
                      onClick={() => {
                        const newImages = [...images];
                        newImages.splice(index, 1);
                        setImages(newImages);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              name="location"
              placeholder="City, State" 
              defaultValue={listing?.location || ""} 
            />
          </div>
          
          <div>
            <Label htmlFor="shipping">Shipping Options</Label>
            <select 
              id="shipping" 
              name="shipping"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
              defaultValue={listing?.shipping || "seller_paid"}
            >
              <option value="local_pickup">Local Pickup Only</option>
              <option value="seller_paid">Free Shipping (Seller Pays)</option>
              <option value="buyer_paid">Buyer Pays Shipping</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="pt-2 flex justify-end space-x-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">
          Create Listing
        </Button>
      </div>
    </form>
  );
};

export default SellPageContent;
