import { ITeams } from './ITeams';

export interface ITeamsService {
  getAll(): Promise<ITeams[]>;
  getById(id: string): Promise<ITeams | null>
}
