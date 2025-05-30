import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Layers, UsersRound, Store } from "lucide-react";

export const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    { name: "Categories", icon: <Layers />, path: "/categories" },
    { name: "Creators", icon: <UsersRound />, path: "/creators" },
    { name: "Brands", icon: <Store />, path: "/vendors" },
    // { name: 'Users', icon: <User />, path:"/"},
    // { name: 'Settings', icon: <Settings />, path:"/settings"},
  ];
  const handleActive = (data) => {
    setActive(data?.name);
    navigate(data?.path);
  };
  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">TrueReff Admin</h1>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item?.path === "/"
              ? window.location.pathname === "/"
              : window.location.pathname.startsWith(item?.path);
          return (
            <li
              key={item.name}
              className={`flex hover:bg-white ${
                isActive ? "bg-white text-black" : ""
              } items-center gap-3 cursor-pointer hover:text-black p-2 rounded-lg`}
              onClick={() => handleActive(item)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
