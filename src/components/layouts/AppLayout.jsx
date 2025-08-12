import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export const AppLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setActive={setActive}
        active={active}
      />
      <div className="flex-1 flex flex-col w-full">
        <Header active={active} setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
