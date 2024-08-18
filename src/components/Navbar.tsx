import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('auth_token'); // Check if the auth token is present

  const handleLogout = () => {
    localStorage.removeItem('auth_token'); // Remove the auth token from local storage
    navigate('/login'); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#121212] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/new_logo.png" alt="Premier League Predictor Logo" className="h-10 w-10 mr-3" />
          <Link to="/" className="text-[#E0E0E0] text-xl font-bold">Premier League Predictor</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">Dashboard</Link>
              <Link to="/table-predictor" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">Table Predictor</Link>
              <Link to="/match-predictions" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">Match Predictions</Link>
              <Link to="/mini-leagues" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">My Mini Leagues</Link>
              <Link to="/profile" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">My Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-[#03DAC6] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#E0E0E0] hover:text-[#BB86FC] transition">Login</Link>
              <Link to="/signup" className="bg-[#BB86FC] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#E0E0E0] focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.293 5.293a1 1 0 011.414 1.414L13.414 13l6.293 6.293a1 1 0 01-1.414 1.414L12 14.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 13 4.293 6.707a1 1 0 011.414-1.414L12 11.586l6.293-6.293z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-[#121212] p-4 rounded-md shadow-lg">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">Dashboard</Link>
              <Link to="/table-predictor" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">Table Predictor</Link>
              <Link to="/match-predictions" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">Match Predictions</Link>
              <Link to="/mini-leagues" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">My Mini Leagues</Link>
              <Link to="/profile" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">My Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-[#03DAC6] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-[#E0E0E0] hover:text-[#BB86FC] transition">Login</Link>
              <Link to="/signup" className="block bg-[#BB86FC] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3] transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
