
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createUser } from "../api/user";

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
    // This is a mock implementation. Replace with actual API calls.
    try {
      console.log("Login attempt with:", email, password);
      
      // Mock successful login with user id 1
      setUser({
        id: "1",
        name: "John Doe",
        email: email,
      });
      localStorage.setItem("UserId", "1"); // Store user ID in local storage
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
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
    localStorage.removeItem("UserId");
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
