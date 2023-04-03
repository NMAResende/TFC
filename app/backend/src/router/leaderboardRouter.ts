import { NextFunction, Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/learderboardController';
import LeaderboardService from '../services/leaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response, next: NextFunction) =>
  leaderboardController.getAllTeamHome(req, res, next));

export default leaderboardRouter;
