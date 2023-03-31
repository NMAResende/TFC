import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardService {
  getAll(): Promise<ILeaderboard[]>;
}
