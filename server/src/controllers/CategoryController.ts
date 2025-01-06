import { Request, Response } from 'express';
import { Category } from '../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (err) {
    return res.status(400).json({ error: 'Error creating category', details: err });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json(category);
  } catch (err) {
    return res.status(400).json({ error: 'Error retrieving category', details: err });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json(category);
  } catch (err) {
    return res.status(400).json({ error: 'Error updating category', details: err });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Error deleting category', details: err });
  }
}
