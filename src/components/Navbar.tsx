import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isLoggedIn = false; // This will eventually come from your app's state

  return (
    <nav className="bg-[#121212] p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <Link to="/" className="text-[#E0E0E0] text-xl font-bold"><img src="/new_logo.png" alt="Premier League Predictor Logo" className="h-10 w-10 mr-3" /></Link>
        <Link to="/" className="text-[#E0E0E0] text-xl font-bold">My Profile</Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="text-[#E0E0E0] hover:text-[#BB86FC]">My Profile</Link>
            <button className="bg-[#03DAC6] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3]">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#E0E0E0] hover:text-[#BB86FC]">Login</Link>
            <Link to="/signup" className="bg-[#BB86FC] text-[#121212] px-4 py-2 rounded hover:bg-[#3700B3]">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
