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

  public async finishMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const finishMat = await this.matchesService.finishMatches(Number(id));

      if (!finishMat) {
        return res.status(401).json({ message: 'id not found' });
      }

      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const updateMat = await this.matchesService
        .update(Number(id), { homeTeamGoals, awayTeamGoals });

      if (!updateMat) {
        return res.status(401).json({ message: 'id not found' });
      }

      return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMat = req.body;

      if (newMat.homeTeamId === newMat.awayTeamId) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const newMatche = await this.matchesService
        .create(newMat);

      if (!newMatche) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      return res.status(201).json(newMatche);
    } catch (error) {
      next(error);
    }
  }
}
