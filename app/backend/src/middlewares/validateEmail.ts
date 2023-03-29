import { NextFunction, Request, Response } from 'express';

const validadeEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const regex = /\S+@\S+\.\S+/;
  const valideEmail = regex.test(email);

  if (!valideEmail) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validadeEmail;
