import { Router } from 'express';
import * as ShoppingListController from '../controllers/ShoppingListController';

const router = Router();

router.post('/', ShoppingListController.createShoppingList);
router.get('/:id', ShoppingListController.getShoppingList);
router.get('/', ShoppingListController.getAllShoppingLists);
router.put('/:id', ShoppingListController.updateShoppingList);
router.delete('/:id', ShoppingListController.deleteShoppingList);

export default router;
