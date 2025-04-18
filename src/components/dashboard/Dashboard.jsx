import React from 'react';

export const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold">Welcome, Admin</h3>
        <p className="text-sm text-gray-500">Here is a quick overview of your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Users</h4>
          <p className="text-2xl font-bold">1,200</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="text-2xl font-bold">$12,400</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-sm text-gray-500">Orders</h4>
          <p className="text-2xl font-bold">320</p>
        </div>
      </div>
    </div>
  );
};
