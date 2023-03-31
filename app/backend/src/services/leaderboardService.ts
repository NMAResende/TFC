// import { ModelStatic } from 'sequelize';
// // referencia: https://sequelize.org/docs/v6/other-topics/typescript/
// import Matches from '../database/models/MatchesModel';
// import Teams from '../database/models/TeamsModel';

// export default class LeaderboardService {
//   protected model: ModelStatic<Matches> = Matches;
//   static teamsModel: ModelStatic<Teams> = Teams;

//   static async getAll(): Promise<Teams[]> {
//     const getAllTeams = await LeaderboardService.teamsModel.findAll();
//     return getAllTeams;
//   }

//   public async getAllTeamHome(): Promise<ILeaderboard[]> {
//     const matchesTrue = await this.model.findAll(
//       { where: { inProgress: true } },
//     );
//     return matchesTrue;
//   }
// }
