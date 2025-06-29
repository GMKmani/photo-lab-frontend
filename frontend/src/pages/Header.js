import React, { useState, useEffect } from "react";
import { Menu, User } from "lucide-react"; 

const Header = ({ onHamburgerClick, loggedInUser, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName'); 
    setUserName(storedUserName);
  }, []);
  
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    sessionStorage.clear(); 
    alert('Logged out successfully!');
    window.location.href = '/'; 
  }

  return (
    <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
      {/* Left Side: Hamburger + Search */}
      <div className="flex items-center gap-4">
        {/* Hamburger - visible only on mobile */}
        <button
          onClick={onHamburgerClick}
          className="md:hidden text-white focus:outline-none"
        >
          <Menu size={24} />
        </button>

        
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white px-3 py-1 rounded focus:outline-none"
        />
      </div>

    
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 text-white hover:text-blue-400 focus:outline-none"
        >
          <User size={24} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg w-40">
            <div className="px-4 py-2 border-b border-gray-700">
              {userName || "Guest"}
            </div>
            <button
                onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;