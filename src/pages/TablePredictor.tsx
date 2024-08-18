import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Team } from '../types/types'; // Ensure this type is defined correctly

const TablePredictor: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  // Fetch teams from the API when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/leagues/1/current_season_teams'); // Replace with actual league ID
        setTeams(response.data.league_teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#121212] mb-6">Table Predictor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="relative w-full">
              <span className="absolute top-0 right-0 text-sm text-white bg-[#BB86FC] rounded-full px-2 py-1">
                {index + 1}
              </span>
              <img
                src={team.crest}
                alt={team.name}
                className="h-16 w-16 mb-2 mx-auto"
              />
            </div>
            <p className="text-center text-lg font-semibold">{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePredictor;
