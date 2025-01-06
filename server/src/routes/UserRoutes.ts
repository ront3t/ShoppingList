import { Router } from 'express';
import * as userController from '../controllers/UserController';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
