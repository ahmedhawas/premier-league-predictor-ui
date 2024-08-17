import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toCamelCase } from '../utils/toCamelCase';
import { MatchWrapper } from '../types/types'; // Import the types

const MatchPredictions: React.FC = () => {
  const [matches, setMatches] = useState<MatchWrapper[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/leagues/:league_id/matches');
        const camelCasedData = toCamelCase(response.data.matches);
        setMatches(camelCasedData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

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

  const handlePredictionChange = (
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((matchWrapper) => {
        if (matchWrapper.match.id === matchId) {
          const updatedPrediction = {
            ...matchWrapper.matchPrediction[0],
            homeTeamGoals,
            awayTeamGoals,
          };

          return {
            ...matchWrapper,
            matchPrediction: matchWrapper.matchPrediction.length > 0 
              ? [updatedPrediction] 
              : [updatedPrediction],
          };
        }
        return matchWrapper;
      })
    );
  };

  const handlePredictionSubmit = async (matchId: number) => {
    const match = matches.find((matchWrapper) => matchWrapper.match.id === matchId);
    if (!match) return;
  
    const { homeTeamGoals, awayTeamGoals } = match.matchPrediction[0] || {};
  
    try {
      if (match.matchPrediction.length > 0 && match.matchPrediction[0].id) {
        // Update existing prediction (PUT)
        const predictionId = match.matchPrediction[0].id;
        await api.put(`/leagues/:league_id/matches/${matchId}/match_predictions/${predictionId}`, {
          home_team_goals: homeTeamGoals,
          away_team_goals: awayTeamGoals,
        });
      } else {
        // Add new prediction (POST)
        const response = await api.post(`/leagues/:league_id/matches/${matchId}/match_predictions`, {
          home_team_goals: homeTeamGoals,
          away_team_goals: awayTeamGoals,
        });
  
        // Update the state with the new prediction
        const newPrediction = response.data;
        setMatches((prevMatches) =>
          prevMatches.map((matchWrapper) => {
            if (matchWrapper.match.id === matchId) {
              return {
                ...matchWrapper,
                matchPrediction: [newPrediction],
              };
            }
            return matchWrapper;
          })
        );
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#121212] mb-6">Match Predictions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((matchWrapper) => {
          const { match, matchPrediction } = matchWrapper;

          const homeTeamGoals = matchPrediction[0]?.homeTeamGoals || 0;
          const awayTeamGoals = matchPrediction[0]?.awayTeamGoals || 0;

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
              <div className="text-center">
                <p className="text-lg mb-2">{matchPrediction.length > 0 ? 'Your Prediction:' : 'Make Your Prediction:'}</p>
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <input
                    type="number"
                    value={homeTeamGoals}
                    onChange={(e) =>
                      handlePredictionChange(match.id, parseInt(e.target.value), awayTeamGoals)
                    }
                    className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                  />
                  <span className="text-lg font-bold">-</span>
                  <input
                    type="number"
                    value={awayTeamGoals}
                    onChange={(e) =>
                      handlePredictionChange(match.id, homeTeamGoals, parseInt(e.target.value))
                    }
                    className="w-12 p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => handlePredictionSubmit(match.id)}
                  className="bg-[#BB86FC] text-white px-4 py-2 rounded font-semibold hover:bg-[#3700B3] transition"
                >
                  {matchPrediction.length > 0 ? 'Update Prediction' : 'Add Prediction'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchPredictions;
