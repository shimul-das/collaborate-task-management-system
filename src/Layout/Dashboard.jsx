// Dashboard.jsx

import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-blue-500 p-4">
        {/* Sidebar content */}
        <div className="text-white font-bold text-xl mb-4">Sidebar</div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-white hover:text-gray-200">Link 1</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">Link 2</a>
          </li>
          {/* Add more links if needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Outlet */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Outlet Title</h2>
          <p>Outlet Content</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
