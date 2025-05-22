import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, Settings, UsersRound, Store } from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', icon: <Home />, path:"/"},
    { name: 'Categories', icon: <Home />, path:"/categories"},
    { name: 'Creators', icon: <UsersRound />, path:"/creators"},
    { name: 'Brands', icon: <Store />, path:"/vendors"},
    { name: 'Users', icon: <User />, path:"/"},
    { name: 'Settings', icon: <Settings />, path:"/settings"},
  ];

  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center gap-3 cursor-pointer hover:text-gray-300" onClick={() => navigate(item?.path)}>
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
