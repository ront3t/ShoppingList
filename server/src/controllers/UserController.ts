import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/User';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { password, ...rest } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with the hashed password
    const user = await User.create({ ...rest, password: hashedPassword });
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
}


export async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id).populate('shoppingLists');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Error retrieving user', details: err });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Error updating user', details: err });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Error deleting user', details: err });
  }
}
