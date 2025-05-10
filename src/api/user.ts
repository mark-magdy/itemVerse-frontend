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
export const createUser = (user: { name: string; email: string; password: string }) => {
  return api.post('/user/register', user);
};

export const loginUser = (credentials: { email: string; password: string }) => {
  return api.post('/user/login', credentials); // adjust endpoint if needed
};