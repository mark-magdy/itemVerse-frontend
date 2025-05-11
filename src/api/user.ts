// src/api/user.ts
import api from './axios';
import axios from 'axios';
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

export const loginUser =async (credentials: { email: string; password: string }) => {
  return api.post('/user/login', credentials); // adjust endpoint if needed
};
export const updateUserr = async (userData: { balance: number }) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error("User ID not found in localStorage");
    return;
  }
  console.log('Update user ID:', userId);
  console.log('Payload:', userData);

  try {
    // Assuming the API is running at the given URL
    const response = await axios.put(`http://192.168.1.35:8084/user/${userId}`, userData);
    console.log('Response:', response.data);
    return response.data; // Return the response if needed
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error; // Propagate the error if needed to handle it later
  }
};

export const getById = async () => {
  const id = localStorage.getItem("userId"); 
  const ret =  await api.get(`/user/${id}`); 
  try {
  localStorage.setItem("user", ret.data ); 
  }catch (e){console.error (e) }; 

  return ret ; 
}