// import { ModelStatic, Op } from 'sequelize';
// import Teams from '../database/models/TeamsModel';
// referencia: https://sequelize.org/docs/v6/other-topics/typescript/
// import Matches from '../database/models/MatchesModel';
// import { IMatches } from '../interfaces/IMatches';
// import { IMatchesService } from '../interfaces/IMatchesService';

// export default class MacthesService implements IMatchesService {
//   protected model: ModelStatic<Matches> = Matches;

//   public async getAll(): Promise<IMatches[]> {
//     const matches = await this.model.findAll({
//       include: [
//         {
//           model: Teams, as: 'homeTeam', attributes: ['teamName'],
//         },
//         {
//           model: Teams, as: 'awayTeam', attributes: ['teamName'],
//         },
//       ],
//     });

//     return matches;
//   }

//   public async inProgressMatches(inProg: boolean) {
//     const trueOrFalse = inProg === true;
//     const inProgressMat = await this.model.findAll({
//       include: [
//         {
//           model: Teams, as: 'homeTeam', attributes: ['teamName'],
//         },
//         {
//           model: Teams, as: 'awayTeam', attributes: ['teamName'],
//         },
//       ],
//       where: { [Op.and]: { inProgress: trueOrFalse } },
//     // referencia: https://doc.esdoc.org/github.com/sequelize/sequelize/manual/querying.html
//     });
//     return inProgressMat;
//   }
// }
