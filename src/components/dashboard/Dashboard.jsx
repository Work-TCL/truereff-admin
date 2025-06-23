import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/axios-api';
import { formatNumber } from '../../Utils/common-utils';
import { IndianRupee } from 'lucide-react';

export const Dashboard = () => {
  const [loading,setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    "activeCollaborations": 3,
    "totalRevenue": 22865.840000000004,
    "totalCommission": 331,
    "totalOrders": 25,
    "activeCreators": 5,
    "activeVendors": 2
})
  useEffect(() => {
    fetchDashboardStats();
  },[]);
   const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/admin/dashboard/states");
      console.log("response",response);
      if (response?.status === 200) {
        setDashboardStats(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      
      setLoading(false);
    }
  };
  return  (
    <div className="p-6">
      {loading && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      )}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold">Welcome, Admin</h3>
        <p className="text-sm text-gray-500">Here is a quick overview of your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Brands</h4>
          <p className="text-2xl font-bold">{formatNumber(dashboardStats?.activeVendors)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Creators</h4>
          <p className="text-2xl font-bold">{formatNumber(dashboardStats?.activeCreators)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Collaborations</h4>
          <p className="text-2xl font-bold">{formatNumber(dashboardStats?.activeCollaborations)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="flex items-center gap-1 text-2xl font-bold"> <IndianRupee size={20}/>{formatNumber(dashboardStats?.totalRevenue)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Commission</h4>
          <p className="flex items-center gap-1 text-2xl font-bold"> <IndianRupee size={20}/>{formatNumber(dashboardStats?.totalCommission)}</p>
        </div>
         <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Orders</h4>
          <p className="text-2xl font-bold">{formatNumber(dashboardStats?.totalOrders)}</p>
        </div>
      </div>
    </div>
  );
};
