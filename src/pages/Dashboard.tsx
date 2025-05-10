
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "@/components/ui/card";
// import { useMockData } from "../hooks/useMockData";
import UserStats from "../components/dashboard/UserStats";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import useFetchStats from "@/hooks/useFetchStats";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("listings");
  const userStats = useFetchStats();
  console.log("userStats in Dash", userStats);
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p>You need to be logged in to view your dashboard.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <UserStats userStats={userStats} listingsCount={3} />
      
      <DashboardTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
      />
    </div>
  );
};

export default Dashboard;
