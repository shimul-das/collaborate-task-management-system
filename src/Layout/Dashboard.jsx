import React from 'react';
import { useUser } from '../Provider/UserContext';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { user, handleLogout } = useUser();

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-blue-500 p-4 flex flex-col items-center">
        <img
          src={user.profilePic}
          alt="Profile Pic"
          className="w-40 h-40 rounded-full mb-4"
        />
        <div className="text-white text-center mb-4">
          <h2 className="font-bold text-xl">{user.name}</h2>
          <p>{user.bio}</p>
        </div>
        <hr className="w-full border-t border-gray-300 mb-4" /> {/* Horizontal line */}
        <ul className="space-y-2 text-center">
        <li>
            <Link to="alltasklist" className="text-white hover:text-gray-200">All Task</Link>
          </li>
          <li>
            <Link to="addtask" className="text-white hover:text-gray-200">Add Task</Link>
          </li>
          <li>
            <Link to="mytasklist" className="text-white hover:text-gray-200">My All Task</Link>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">Link 2</a>
          </li>
          {/* Add more links if needed */}
        </ul>
        <hr className="w-full border-t border-gray-300 mb-4" /> {/* Horizontal line */}
        <button
          className="block px-4 bg-red-500 py-2 text-white hover:bg-blue-100 hover:text-black w-full text-left"
          onClick={handleLogout}
        >
          Logout
        </button>
        <Link to="/" className="block px-4 bg-green-500 py-2 text-white hover:bg-blue-100 hover:text-black w-full text-left mt-4">
          Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        {/* Outlet */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



