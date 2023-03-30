import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
// referencia: https://sequelize.org/docs/v6/other-topics/typescript/
import Matches from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/IMatches';
import { IMatchesService } from '../interfaces/IMatchesService';

export default class MacthesService implements IMatchesService {
  protected model: ModelStatic<Matches> = Matches;

  public async getAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: Teams, as: 'homeTeam', attributes: ['teamName'],
        },
        {
          model: Teams, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
    });

    return matches;
  }
}
