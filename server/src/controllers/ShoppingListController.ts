import { Request, Response } from 'express';
import { ShoppingList } from '../models/ShoppingList';

export async function createShoppingList(req: Request, res: Response) {
  try {
    const list = await ShoppingList.create(req.body);
    return res.status(201).json(list);
  } catch (err) {
    return res.status(400).json({ error: 'Error creating shopping list', details: err });
  }
}

export async function getShoppingList(req: Request, res: Response) {
  try {
    const list = await ShoppingList.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items')
      .populate('sharedWith', 'name email');
    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ error: 'Error retrieving list', details: err });
  }
}

export async function updateShoppingList(req: Request, res: Response) {
  try {
    const list = await ShoppingList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }
    return res.json(list);
  } catch (err) {
    return res.status(400).json({ error: 'Error updating list', details: err });
  }
}

export async function deleteShoppingList(req: Request, res: Response) {
  try {
    const list = await ShoppingList.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }
    return res.json({ message: 'Shopping list deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Error deleting list', details: err });
  }
}
