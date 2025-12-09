import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/axios-api';
import { formatNumber } from '../../Utils/common-utils';
import { IndianRupee } from 'lucide-react';

export const Dashboard = () => {
  const [loading,setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    "activeCollaborations": 0,
    "totalRevenue": 0,
    "totalCommission": 0,
    "totalOrders": 0,
    "activeCreators": 0,
    "activeVendors": 0
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
    <div className="p-4 md:p-6">
      {loading && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      )}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold">Welcome, Admin</h3>
        <p className="text-sm text-gray-500">Here is a quick overview of your dashboard.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Brands</h4>
          <p className="text-xl md:text-2xl font-bold">{formatNumber(dashboardStats?.activeVendors)}</p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Creators</h4>
          <p className="text-xl md:text-2xl font-bold">{formatNumber(dashboardStats?.activeCreators)}</p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Active Collaborations</h4>
          <p className="text-xl md:text-2xl font-bold">{formatNumber(dashboardStats?.activeCollaborations)}</p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="flex items-center gap-1 text-xl md:text-2xl font-bold"> <IndianRupee  className='size-[20px] md:size-[24px]'/>{formatNumber(dashboardStats?.totalRevenue)}</p>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Commission</h4>
          <p className="flex items-center gap-1 text-xl md:text-2xl font-bold"> <IndianRupee  className='size-[20px] md:size-[24px]'/>{formatNumber(dashboardStats?.totalCommission)}</p>
        </div>
         <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Orders</h4>
          <p className="text-xl md:text-2xl font-bold">{formatNumber(dashboardStats?.totalOrders)}</p>
        </div>
      </div>
    </div>
  );
};
