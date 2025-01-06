import { Router } from 'express';
import {
  createItem,
  getItem,
  updateItem,
  deleteItem
} from '../controllers/ItemController';

const router = Router();

router.post('/', createItem);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
