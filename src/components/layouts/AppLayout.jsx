import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';

export const AppLayout = () => {
  const [active,setActive] = useState("Dashboard")
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar setActive={setActive} active={active}/>
      <div className="flex-1 flex flex-col">
        <Header active={active}/>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};