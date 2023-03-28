import { NextFunction, Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  teamsController.getAll(req, res, next));

teamsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  teamsController.getById(req, res, next));

export default teamsRouter;
