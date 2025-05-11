import api from './axios';
 
export const getUserPurchases = () => {
  const id = localStorage.getItem("userId");
  console.log("UserId from localStorage:", id); 
  if (!id) throw new Error("UserId not found in localStorage");
  return api.get(`/orders/${id}`);
};
export interface CreateOrderDTO {
  userId: number;
  itemIds: number[];
  status: string;
  orderDate: string;
}

export const createOrder = async (dto: CreateOrderDTO) => {
  console.log(dto) ; 
  return api.post("/orders/add", dto);
};
