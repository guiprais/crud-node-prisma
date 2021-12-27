import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export const all = async (request: Request, response: Response) => {
  const users = await UserService.findAll();
  response.json({ users });
};

export const create = async (request: Request, response: Response) => {
  const { email, name, age } = request.body;

  if (email && name) {
    const user = await UserService.findOne({ email });

    if (!user) {
      const newUser = await UserService.create({
        email,
        name,
        age: parseInt(age),
      });

      response.json({ user: newUser });
    } else {
      response.json({ error: 'Já existe usuário com este e-mail' });
    }
  } else {
    response.json({ error: 'Daddos não preenchidos' });
  }
};
