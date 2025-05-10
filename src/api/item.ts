// src/api/user.ts
import api from './axios';

export const fetchItems = () => {
  return api.get('/item');
};

export const getItemById = (id: string) => {
  return api.get(`/item/${id}`);
};

export const createItem = (item: any) => {
  return api.post('/item', item);
};

// export const updateItem = (id: string, item: any) => {
//   return api.put(`/item/${id}`, item);
// };

