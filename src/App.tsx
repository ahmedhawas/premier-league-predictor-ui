import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MatchPrediction from './pages/MatchPrediction';
import CreateLeague from './pages/CreateLeague';
import InviteUsers from './pages/InviteUsers';
import Matches from './pages/Matches';
import Predictions from './pages/Predictions';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F7]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/league/:id/matches/:matchId" element={<MatchPrediction />} />
          {/* Add other routes as needed */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
