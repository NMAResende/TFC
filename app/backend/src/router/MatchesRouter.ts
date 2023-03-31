import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchesController.getAll(req, res, next));

matchesRouter.post(
  '/',
  validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.create(req, res, next),
);

matchesRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.update(req, res, next),
);

matchesRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.finishMatches(req, res, next),
);

export default matchesRouter;
