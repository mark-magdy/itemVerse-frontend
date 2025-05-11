
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createUser , loginUser } from "../api/user";
// import {  } from "../api/user";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock authentication functions - these would connect to your backend in a real app
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log("Login ahhttempt with:", email, password);

    const response = await loginUser({ email, password });
    console.log("Login response:", response);
    if (response.status !== 200) {
      console.error("Login failed with status:", response.status);
      return false;
    }
    // const response = await loginUser({email, password });
    console.log("Login attempt with:", email, password);  
    const userData = response.data.user;

    // Store in state
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userId", userData.id); 
    localStorage.setItem("UserId", userData.id); 

    localStorage.setItem ("authToken", response.data.token); 
    return true;
  } catch (error: any) {
    console.error("Login error:", error.response?.data?.message || error.message);
    return false;
  }
  return true ; 
};

const register = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    console.log("Registration attempt with:", name, email, password);

    const response = await createUser({ name, email, password });

    const createdUser = response.data;

    setUser({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });

    localStorage.setItem("UserId", createdUser.id); 
    localStorage.setItem("userId", createdUser.id); 
    localStorage.setItem("user", JSON.stringify(createdUser)); 
    return true;
  } catch (error) {
    console.error("Registration error:", error);
    return false;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("UserId");
    localStorage.removeItem("authToken"); 
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
