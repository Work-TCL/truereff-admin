import { LogOut } from 'lucide-react';
import React from 'react';
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }
  return (
    <header className="h-16 w-full bg-white flex items-center justify-between px-6 border-b">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <LogOut className='cursor-pointer' onClick={handleLogOut}/>
      </div>
      
    </header>
  );
};
