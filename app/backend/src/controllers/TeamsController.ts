import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private readonly teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const teams = await this.teamsService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { id } = req.params;
    try {
      const team = await this.teamsService.getById(id);
      if (!team) {
        return res.status(400).json({ message: 'Team not Found!' });
      }
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
