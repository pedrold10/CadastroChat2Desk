import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await registerUser(email, password, name);
    res.status(201).json(user);
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message }); 
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message }); 
  }
};
