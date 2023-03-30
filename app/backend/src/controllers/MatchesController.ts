import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class TeamsController {
  private readonly matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matches = await this.matchesService.getAll();
        return res.status(200).json(matches);
      }
      const matchesTrue = await this.matchesService.inProgressMatches(inProgress === 'true');
      return res.status(200).json(matchesTrue);
    } catch (error) {
      next(error);
    }
  }

  // public async finishMatches(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.body;

  //     const inProgressMat = await this.matchesService.finishMatches(id);

  //     return res.status(200).json(inProgressMat);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
