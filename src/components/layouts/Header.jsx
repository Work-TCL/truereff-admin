import { LogOut, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConfirmModal from '../common/ConfirmModel';

const Header = ({active,setIsOpen}) => {
    const navigate = useNavigate();
    const [isModalOpen,setIsModalOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }
    
  return (
    <header className="h-16 w-full bg-white flex items-center justify-between px-6 border-b">
      <div className='flex items-center gap-3'>
        <Menu className='md:hidden' onClick={() => setIsOpen(true)}/>
      <h2 className="text-xl font-semibold">{active}</h2>
      </div>
      <div className="flex items-center gap-3">
        {/* <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        /> */}
        <LogOut className='cursor-pointer' onClick={()=> setIsModalOpen(true)}/>
      </div>
      <ConfirmModal
              isOpen={Boolean(isModalOpen)}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleLogOut}
              title="Are you sure you want to logout?"
              confirmText={"Yes"}
              cancelText="No"
            />
      
    </header>
  );
};

export default Header;
