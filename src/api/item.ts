// src/api/user.ts
import api from './axios';

export const fetchItems = () => {
  return api.get('/item');
};

export const getItemById = (id: string) => {
  return api.get(`/item/${id}`);
};

export const createItem = (item: any) => {
  return api.post(`/item/add/${localStorage.getItem("UserId")}`, item);
};
export const getUserItems = () => {
  const id = localStorage.getItem("UserId");
  return []; 
  if (!id) throw new Error("UserId not found in localStorage");
  return api.get(`/item/${id}/items`);
};
// export const updateItem = (id: string, item: any) => {
//   return api.put(`/item/${id}`, item);
// };

