import { IMatches } from './IMatches';

export interface IMatchesService {
  getAll(): Promise<IMatches[]>;
}
