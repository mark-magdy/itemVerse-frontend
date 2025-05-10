import api from './axios';
 
export const getUserPurchases = () => {
  const id = localStorage.getItem("UserId");
  console.log("UserId from localStorage:", id); 
  if (!id) throw new Error("UserId not found in localStorage");
  return api.get(`/orders/${id}`);
};


