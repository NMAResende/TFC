import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import { IUpdate } from '../interfaces/IUpdate';
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

  public async inProgressMatches(inProgress: boolean) {
    const inProgressMat = await this.model.findAll({
      include: [
        {
          model: Teams, as: 'homeTeam', attributes: ['teamName'],
        },
        {
          model: Teams, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
      where: { inProgress },
    });
    return inProgressMat;
  }

  public async finishMatches(id: number) {
    const finishMat = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return finishMat;
  }

  public async update(id: number, up: IUpdate) {
    const updateMat = await this.model.update(
      { homeTeamGoals: up.homeTeamGoals, awayTeamGoals: up.awayTeamGoals },
      { where: { id } },
    );
    return updateMat;
  }

  public async create(newMat: Matches) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMat;
    // preciso pegar o id de cada time
    const homeTeam = await this.model.findByPk(Number(newMat.homeTeamId));
    const awayTeam = await this.model.findByPk(Number(newMat.awayTeamId));

    if (homeTeam && awayTeam) {
      const newMatche = await this.model.create({
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
      return newMatche;
    }
  }
}
