import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../Provider/UserContext';

const Header = () => {
  const { user, handleLogout } = useUser();
  console.log(user)
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          T-Task
        </div>

        <ul className="flex space-x-4"> {/* Add this ul element */}
          <li>
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          </li>
          {/* Add more navigation links here */}
        </ul>

        {user ? (
          <div className="relative" style={{ zIndex: 10 }}>
            <div className="text-white cursor-pointer" onClick={toggleDropdown}>
              Welcome, {user.name} ▼
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded">
                <Link to="/dashboard/userhome" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Dashboard</Link>
                <div className="border-t border-gray-300"></div>
                <button
                  className="block px-4 py-2 text-blue-500 hover:bg-blue-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="login">
            <button className="bg-white text-blue-500 hover:bg-blue-600 text-sm font-semibold py-2 px-4 rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
