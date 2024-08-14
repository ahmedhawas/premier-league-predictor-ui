import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateLeague from './pages/CreateLeague';
import InviteUsers from './pages/InviteUsers';
import Matches from './pages/Matches';
import Predictions from './pages/Predictions';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import MatchPrediction from './pages/MatchPrediction';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-league" element={<CreateLeague />} />
          <Route path="/invite-users" element={<InviteUsers />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/league/:id/matches/:matchId" element={<MatchPrediction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
