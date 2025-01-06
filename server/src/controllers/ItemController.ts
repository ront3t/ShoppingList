import { Request, Response } from 'express';
import { Item } from '../models/Item';

export async function createItem(req: Request, res: Response) {
  try {
    const item = await Item.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ error: 'Error creating item', details: err });
  }
}

export async function getItem(req: Request, res: Response) {
  try {
    const item = await Item.findById(req.params.id).populate('category');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: 'Error retrieving item', details: err });
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: 'Error updating item', details: err });
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Error deleting item', details: err });
  }
}
