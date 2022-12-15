import express from 'express';
import { container } from 'tsyringe';
import UserController from '../controllers/user.controller';
const userController: any = container.resolve(UserController);

const router = express.Router();
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:accountId/balance', userController.getUserBalance);
router.put('/:userId/account', userController.updateAccount);

export default router;
