import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const MatchPrediction: React.FC = () => {
  const { id: leagueId, matchId } = useParams<{ id: string; matchId: string }>();
  const [homeTeamGoals, setHomeTeamGoals] = useState('');
  const [awayTeamGoals, setAwayTeamGoals] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const predictionData = {
      league_id: leagueId,
      match_id: matchId,
      home_team_goals: parseInt(homeTeamGoals),
      away_team_goals: parseInt(awayTeamGoals),
    };

    try {
      const response = await fetch(`/leagues/${leagueId}/matches/${matchId}/match_predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionData),
      });

      if (response.ok) {
        alert('Prediction submitted successfully!');
      } else {
        alert('Failed to submit prediction.');
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F7F7F7] p-4">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {/* <SoccerBall className="h-16 w-16 text-[#BB86FC]" /> */}
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-center text-[#121212] mb-6">Predict Match Score</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg text-[#121212] mb-2">Home Team Goals</label>
            <input
              type="number"
              value={homeTeamGoals}
              onChange={(e) => setHomeTeamGoals(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
              required
              min="0"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-[#121212] mb-2">Away Team Goals</label>
            <input
              type="number"
              value={awayTeamGoals}
              onChange={(e) => setAwayTeamGoals(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
              required
              min="0"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-[#BB86FC] text-white py-3 rounded-lg font-semibold hover:bg-[#3700B3] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Prediction
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default MatchPrediction;
