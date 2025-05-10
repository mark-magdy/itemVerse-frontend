// src/api/user.ts
import api from './axios';

export const fetchUsers = () => {
  return api.get('/user');
};

export const getUserById = (id: string) => {
  return api.get(`/user/${id}`);
};

export const getAllStats = (id: string ) => { 
    return api.get(`/item/statistics/${id}`);
}
export const createUser = (user: any) => {
  return api.post('/user/register', user);
};