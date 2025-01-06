import { Router } from 'express';
import * as categoryController from '../controllers/CategoryController';

const router = Router();

router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
