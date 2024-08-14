import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/signup', {
        email,
        username,
      });

      if (response.status === 200) {
        toast.success('User created successfully. Please log in.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to signup`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F7F7]">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h1 className="text-3xl font-bold text-[#121212] mb-4">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#BB86FC] text-[#121212] py-3 rounded font-semibold hover:bg-[#3700B3] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#BB86FC] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
