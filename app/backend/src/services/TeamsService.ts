import { ModelStatic } from 'sequelize';
// referencia: https://sequelize.org/docs/v6/other-topics/typescript/
import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/ITeams';
import { ITeamsService } from '../interfaces/ITeamsService';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Teams> = Teams;

  public async getAll(): Promise<ITeams[]> {
    const teams = this.model.findAll();
    return teams;
  }

  public async getById(id: string): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
