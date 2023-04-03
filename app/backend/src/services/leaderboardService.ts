import { ModelStatic } from 'sequelize';
import { ILeaderboard } from '../interfaces/ILeaderboard';
// referencia: https://sequelize.org/docs/v6/other-topics/typescript/
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatches } from '../interfaces/IMatches';
import { awayResult, awaySort } from '../utils/regrasNegociosAway';
import { homeResult, homeSort } from '../utils/regrasNegociosHome';

export default class LeaderboardService {
  protected model: ModelStatic<Matches> = Matches;
  // static teamsModel: ModelStatic<Teams> = Teams;

  public async getAllTeamHome(): Promise<ILeaderboard[]> {
    const matchesFalse = await this.model.findAll(
      { where: { inProgress: false },
        include: [{ model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] } }],
      },
    );
    const teamResult = homeResult(matchesFalse as unknown as IMatches[]);
    const homeTeam = homeSort(teamResult);
    return homeTeam;
  }

  public async getAllTeamAway(): Promise<ILeaderboard[]> {
    const matchesFalse = await this.model.findAll(
      { where: { inProgress: false },
        include: [{ model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] } }],
      },
    );
    const teamResult = awayResult(matchesFalse as unknown as IMatches[]);
    const awayTeam = awaySort(teamResult);
    return awayTeam;
  }
}
