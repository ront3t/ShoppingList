import { Router } from 'express';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
} from '../controllers/CategoryController';

const router = Router();

router.post('/', createCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
