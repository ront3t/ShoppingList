import { Router } from 'express';
import {
  createShoppingList,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList
} from '../controllers/ShoppingListController';

const router = Router();

router.post('/', createShoppingList);
router.get('/:id', getShoppingList);
router.put('/:id', updateShoppingList);
router.delete('/:id', deleteShoppingList);

export default router;
