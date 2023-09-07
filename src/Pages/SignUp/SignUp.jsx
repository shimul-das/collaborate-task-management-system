import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

const SignUp = ({ onSignUp, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [uploadedImageLinks, setUploadedImageLinks] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password,
      bio,
      profilePic: uploadedImageLinks[0]
    };

    const userWithEmail = existingUsers.find(user => user.email === email);

    if (userWithEmail) {
      alert('Email is already registered. Please use a different email.');
    } else {
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful!',
        text: 'You have successfully signed up.',
        confirmButtonText: 'Continue',
      });
      navigate('/login');
    }
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const imgResponse = await fetch(img_hosting_url, {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (imgResponse.success) {
        setUploadedImageLinks((prevLinks) => [...prevLinks, imgResponse.data.display_url]);
        console.log('Image uploaded successfully:', imgResponse.data.display_url);
      } else {
        console.error('Image upload failed:', imgResponse.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setIsButtonEnabled(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 border border-gray-300 p-4 rounded-lg">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-600">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-gray-600">Profile Picture:</label>
            <input
              type="file"
              id="profilePic"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!isButtonEnabled}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login">
            <button
              className="text-blue-500 hover:underline"
              onClick={onLoginClick}
            >
              Login
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
