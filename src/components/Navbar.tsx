import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('auth_token'); // Check if the auth token is present

  const handleLogout = () => {
    localStorage.removeItem('auth_token'); // Remove the auth token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-[#121212] p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <img src="/new_logo.png" alt="Premier League Predictor Logo" className="h-10 w-10 mr-3" />
        <Link to="/" className="text-[#E0E0E0] text-xl font-bold">Premier League Predictor</Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/match-predictions" className="text-[#E0E0E0] hover:text-[#BB86FC]">Matches</Link>
            <button
              onClick={handleLogout}
              className="bg-[#03DAC6] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#E0E0E0] hover:text-[#BB86FC]">Login</Link>
            <Link to="/signup" className="bg-[#BB86FC] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
