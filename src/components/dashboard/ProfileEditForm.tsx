
import React  , {useState} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "lucide-react";
import { PhotoUploadButton } from "./ListingForm";
import  {updateUserr , getById }  from "../../api/user";
interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  photoURL?: string;
  balance?: number;
}

interface ProfileEditFormProps {
  user: UserProfile;
}

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const { toast } = useToast();
  console.log("user entered " , user ); 
  const formuser = JSON .parse (localStorage.getItem("user")); 
  console.log("form user" , formuser ); 
  const [formData, setFormData] = useState<UserProfile>({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    bio: user.bio || "",
    photoURL: user.photoURL || "",
    balance: formuser.balance || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === "balance" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make sure all required fields are available in formData
      if (!formData.name || formData.balance === null || formData.balance === undefined) {

         toast({
        title: "ERROR",
        description: "Name and balance are required fields.",
      });
        return;
      }

      const updatedUser = await updateUserr({

        balance: formData.balance,
      });

      // If update is successful, show success toast
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      // Optionally handle updated user data
      console.log('Updated user data:', updatedUser);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
      });
    }
    // const ret = await getById();  
  };

  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
          {formData.photoURL ? (
            <img src={formData.photoURL} alt={formData.name || "User"} className="w-full h-full object-cover" />
          ) : (
            <User className="h-16 w-16 text-gray-400" />
          )}
        </div>
        <Button
          onClick={() => setFormData((prev) => ({ ...prev, photoURL: "" }))}
          variant="outline"
        >
          Remove Photo
        </Button>
      </div>

      <div className="md:w-2/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} disabled />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location} onChange={handleChange} placeholder="Your location" />
            </div>

            <div>
              <Label htmlFor="balance">Balance</Label>
              <Input
                id="balance"
                type="number"
                value={formData.balance}
                onChange={handleChange}
                placeholder="Account balance"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
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

