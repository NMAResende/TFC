import { Request, Response, Router } from 'express';
import UsersController from '../controllers/UsersController';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';
import validateToken from '../middlewares/validateToken';
import UsersService from '../services/UserService';

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const usersRouter = Router();

usersRouter.post(
  '/',
  validateEmail,
  validatePassword,
  (req: Request, res: Response) =>
    usersController.login(req, res),
);

usersRouter.get(
  '/role',
  validateToken,
  (req: Request, res: Response) =>
    usersController.role(req, res),
);

export default usersRouter;
