import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Link } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', {
        email,
        access_code: accessCode,
      });

      if (response.status === 200 && response.data.auth_token) {
        localStorage.setItem('auth_token', response.data.auth_token);
        toast.success('Login successful!');
        navigate('/dashboard'); // Redirect to the dashboard page
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Error: ${error.response.status}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F7F7]">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h1 className="text-3xl font-bold text-[#121212] mb-4">Login</h1>
        <form onSubmit={handleLogin}>
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
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your access code"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#BB86FC] text-[#121212] py-3 rounded font-semibold hover:bg-[#3700B3] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#BB86FC] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
