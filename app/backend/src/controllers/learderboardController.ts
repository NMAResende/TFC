// import { NextFunction, Request, Response } from 'express';
// import LeaderboardService from '../services/leaderboardService';

// export default class LeaderboardController {
//   private readonly leaderboardService: LeaderboardService;

//   constructor(leaderboardService: LeaderboardService) {
//     this.leaderboardService = leaderboardService;
//   }

//   public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//     try {
//       const leaderboard = await this.leaderboardService.getAll();
//       return res.status(200).json(leaderboard);
//     } catch (error) {
//       next(error);
//     }
//   }
// }
