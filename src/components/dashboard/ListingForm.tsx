
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ListingFormProps {
  listing?: {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string;
  };
  isEdit?: boolean;
}

const ListingForm = ({ listing, isEdit = false }: ListingFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // TODO: send formData to the server
  

    toast({
      title: isEdit ? "Listing updated" : "Listing created",
      description: `Your listing has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
  };

  // // Mock photo upload handler
  // const handlePhotoUpload = () => {
  //   // Simulate file upload with mock images
  //   // const mockImageUrls = [
  //   //   "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   //   "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   //   "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   // ];
    
  //   // setImages([...images, mockImageUrls[0]]);
  //   <PhotoUploadButton 
  //           multiple
  //           onUpload={(urls) => {
  //             setImages([...images, ...urls]);
  //           }}
  //   /> 
  // };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="title">Title MAk </Label>
          <Input 
            id="title" 
            placeholder="Enter listing title" 
            defaultValue={listing?.title || ""} 
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea 
            id="description" 
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" 
            placeholder="Describe your item" 
            defaultValue={listing?.description || ""}
          />
        </div>
        
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price" 
            type="number" 
            placeholder="0.00" 
            min="0" 
            step="0.01"
            defaultValue={listing?.price || ""} 
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <select 
            id="category" 
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-10" 
            defaultValue={listing?.category || ""}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="toys">Toys & Games</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <Label>Photos</Label>
          <PhotoUploadButton 
            multiple
            onUpload={(urls) => {
              setImages([...images, ...urls]);
              console.log("Uploaded URLs: ", urls); 
            }}            
          />
          
          {(images.length > 0 || (listing?.image && !Array.isArray(listing.image))) && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {listing?.image && !Array.isArray(listing.image) && (
                <div className="relative w-full h-24 rounded overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt="Listing" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              {images.map((img, index) => (
                <div key={index} className="relative w-full h-24 rounded overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Upload ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">
          {isEdit ? "Update Listing" : "Create Listing"}
        </Button>
      </div>
    </form>
  );
};

// Photo upload button component
// const PhotoUploadButton = ({ 
//   onUpload, 
//   multiple = false 
// }: { 
//   onUpload: (urls: string | string[]) => void;
//   multiple?: boolean;
// }) => {
//   const handlePhotoUpload = () => {
//     // Simulate file upload
//     const mockImageUrls = [
//       "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
//     ];
    
//     if (multiple) {
//       onUpload(mockImageUrls);
//     } else {
//       onUpload(mockImageUrls[0]);
//     }
//   };
  
//   return (
//     <Button
//       type="button"
//       className="mb-2 bg-marketplace-600 hover:bg-marketplace-700"
//       onClick={handlePhotoUpload}
//     >
//       Upload Photo{multiple ? 's' : ''}
//     </Button>
//   );
// };
const PhotoUploadButton = ({
  onUpload,
  multiple = false,
}: {
  onUpload: (urls: string[] | string) => void;
  multiple?: boolean;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append("file", file);
      try {
        //TODO: replace with the actual  
        const res = await fetch("", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const data = await res.json();
        uploadedUrls.push(data.url); 

        
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    if (multiple) {
      onUpload(uploadedUrls);
    } else {
      onUpload(uploadedUrls[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        className="mb-2 bg-marketplace-600 hover:bg-marketplace-700"
        onClick={triggerFileInput}
      >
        Upload Photo{multiple ? "s" : ""}
      </Button>
    </>
  );
};
export default ListingForm;
export { PhotoUploadButton };
