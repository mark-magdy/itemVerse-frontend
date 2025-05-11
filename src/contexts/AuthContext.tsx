import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createUser, loginUser } from "../api/user";

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

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });
      if (response.status !== 200) return false;

      const userData = response.data.user;
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("authToken", response.data.token);

      return true;
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await createUser({ name, email, password });
      const createdUser = response.data;

      setUser({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });

      localStorage.setItem("user", JSON.stringify(createdUser));
      localStorage.setItem("userId", createdUser.id);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    localStorage.removeItem("userId");
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
