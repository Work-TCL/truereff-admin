import React from 'react';
import { Home, User, Settings } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <Home /> },
    { name: 'Users', icon: <User /> },
    { name: 'Settings', icon: <Settings /> },
  ];

  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
