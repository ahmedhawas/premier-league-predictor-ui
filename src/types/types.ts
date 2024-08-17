export interface Team {
  id: number;
  leagueId: number;
  name: string;
  currentRank: number | null;
  externalId: number;
  goalsScored: number | null;
  goalsConceded: number | null;
  crest: string;
}

export interface Match {
  id: number;
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  startTime: string;
  endTime: string;
  externalId: number;
  homeTeam: Team;
  awayTeam: Team;
}

export interface MatchPrediction {
  id: number;
  matchId: number;
  userId: number;
  leagueId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  isLocked: boolean;
  pointsEarned: number | null;
}

export interface MatchWrapper {
  match: Match;
  matchPrediction: MatchPrediction[];
}

