import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MatchPrediction from './pages/MatchPrediction';
import TablePredictor from './pages/TablePredictor';
import MiniLeagues from './pages/MiniLeagues';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MatchPredictions from './pages/MatchPredictions'; // Import the renamed component

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F7]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/match-predictions" element={<MatchPredictions />} />
          <Route path="/table-predictor" element={<TablePredictor />} />
          <Route path="/mini-leagues" element={<MiniLeagues />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
