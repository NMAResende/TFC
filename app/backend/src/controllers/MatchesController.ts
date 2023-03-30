// import { NextFunction, Request, Response } from 'express';
// import MatchesService from '../services/MatchesService';

// export default class TeamsController {
//   private readonly matchesService: MatchesService;

//   constructor(matchesService: MatchesService) {
//     this.matchesService = matchesService;
//   }

//   public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//     try {
//       const matches = await this.matchesService.getAll();
//       return res.status(200).json(matches);
//     } catch (error) {
//       next(error);
//     }
//   }
// }
