import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UsersController {
  constructor(private _service = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._service.login({ email, password });

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  }

  public role = (req: Request, res: Response) => {
    const { decoded } = req.body;
    const { role } = decoded;

    if (!decoded) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(200).json({ role });
  };
}

export default UsersController;
