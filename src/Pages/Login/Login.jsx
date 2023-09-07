import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Provider/UserContext';

const Login = ({ onLogin, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useUser();
  const navigate = useNavigate();
  

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve users data from local storage
    const users = Object.values(JSON.parse(localStorage.getItem('users')) || {});
  
    // Check if there are users in local storage
    if (users.length > 0) {
      const foundUser = users.find(user => user.email === email && user.password === password);
      if (foundUser) {
        alert('Successfully Logged In');
        handleLogin(foundUser);
        sessionStorage.setItem('user', JSON.stringify(foundUser));
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('No users found. Please sign up.');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 border border-gray-300 p-4 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup">
            <button
              className="text-blue-500 hover:underline"
              onClick={onSignUpClick}
            >
              Sign up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


