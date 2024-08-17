import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toCamelCase } from '../utils/toCamelCase';

const MatchPredictions: React.FC = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/leagues/:league_id/matches');
        const camelCasedData = toCamelCase(response.data.matches);
        setMatches(camelCasedData);
        setFilteredMatches(camelCasedData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    const filtered = matches.filter((match: any) =>
      formatValidDate(match.match.startTime) === selectedDate
    );

    setFilteredMatches(filtered);
  };

  const formatValidDate = (dateString: string | undefined): string => {
    try {
      if (!dateString) throw new Error('Invalid date');
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error('Invalid date');
      return format(date, 'yyyy-MM-dd');
    } catch {
      return 'Invalid date';
    }
  };

  const handlePredictionChange = async (
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ) => {
    try {
      await api.post(`/leagues/:league_id/matches/${matchId}/match_predictions`, {
        home_team_goals: homeTeamGoals,
        away_team_goals: awayTeamGoals,
      });
      // Update match predictions state here
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#121212] mb-6">Match Predictions</h1>

      <div className="mb-6">
        <label className="block text-lg mb-2">Filter by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((matchWrapper: any) => {
          const { match, matchPrediction } = matchWrapper;

          return (
            <motion.div
              key={match.id}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="h-16 w-16 mr-2" />
                <span className="text-2xl font-bold">/</span>
                <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="h-16 w-16 ml-2" />
              </div>
              <div className="text-center mb-4">
                <p className="text-lg">{formatValidDate(match.startTime)}</p>
              </div>
              {matchPrediction.length > 0 ? (
                <div className="text-center">
                  <p className="text-lg mb-2">Your Prediction:</p>
                  <div className="flex justify-center items-center space-x-2">
                    <input
                      type="number"
                      value={matchPrediction[0].homeTeamGoals}
                      onChange={(e) =>
                        handlePredictionChange(match.id, parseInt(e.target.value), matchPrediction[0].awayTeamGoals)
                      }
                      className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                    <span className="text-lg font-bold">-</span>
                    <input
                      type="number"
                      value={matchPrediction[0].awayTeamGoals}
                      onChange={(e) =>
                        handlePredictionChange(match.id, matchPrediction[0].homeTeamGoals, parseInt(e.target.value))
                      }
                      className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg mb-2">Make Your Prediction:</p>
                  <div className="flex justify-center items-center space-x-2">
                    <input
                      type="number"
                      placeholder="0"
                      onChange={(e) =>
                        handlePredictionChange(match.id, parseInt(e.target.value), 0)
                      }
                      className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                    <span className="text-lg font-bold">-</span>
                    <input
                      type="number"
                      placeholder="0"
                      onChange={(e) =>
                        handlePredictionChange(match.id, 0, parseInt(e.target.value))
                      }
                      className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchPredictions;
