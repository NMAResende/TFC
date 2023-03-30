import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
// import { IMatches } from '../interfaces/IMatches';
// import { IMatchesService } from '../interfaces/IMatchesService';
// referencia: https://sequelize.org/docs/v6/other-topics/typescript/
import Matches from '../database/models/MatchesModel';

export default class MacthesService {
  constructor(protected model: ModelStatic<Matches> = Matches) { }

  public async getAll(): Promise<Matches[]> {
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

  public async inProgressMatches(inProg: boolean) {
    const inProgressMat = await this.model.findAll({
      include: [
        {
          model: Teams, as: 'homeTeam', attributes: ['teamName'],
        },
        {
          model: Teams, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
      where: { inProg },
    });
    return inProgressMat;
  }

  // public async finishMatches(id: number) {
  //   const finishMat = await this.model.update(
  //     {
  //       inProgress: false,
  //     },
  //     { where: { id } },
  //   );
  //   return finishMat;
  // }
}
