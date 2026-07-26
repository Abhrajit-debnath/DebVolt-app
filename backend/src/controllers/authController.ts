import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password, name, role, vehicleNo } = req.body;
    
    if (!phone || !password) {
      res.status(400).json({ error: 'Phone and password are required' });
      return;
    }

    const user = await authService.register({
      phone,
      password,
      name,
      role,
      vehicleNo,
    });

    res.status(201).json(user);
  } catch (error: any) {
    console.error(">>> REGISTRATION ERROR DETECTED <<<");
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).json({ error: 'Phone and password are required' });
      return;
    }

    const result = await authService.login(phone, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
