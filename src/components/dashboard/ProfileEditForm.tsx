
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "lucide-react";
import { PhotoUploadButton } from "./ListingForm";

interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  photoURL?: string;
}

interface ProfileEditFormProps {
  user: UserProfile;
}

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.name || "User"} className="w-full h-full object-cover" />
          ) : (
            <User className="h-16 w-16 text-gray-400" />
          )}
        </div>
        <PhotoUploadButton 
          onUpload={(url) => {
            toast({
              title: "Profile photo updated",
              description: "Your profile photo has been updated successfully."
            });
          }} 
        />
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Photo removed",
              description: "Your profile photo has been removed."
            });
          }}
        >
          Remove Photo
        </Button>
      </div>
      
      <div className="md:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                defaultValue={user.name || ""}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                defaultValue={user.email || ""}
                disabled
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                placeholder="Your phone number"
                defaultValue={user.phone || ""}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Your location"
                defaultValue={user.location || ""}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" 
              placeholder="Tell us about yourself"
              defaultValue={user.bio || ""}
            />
          </div>
          
          <div>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
