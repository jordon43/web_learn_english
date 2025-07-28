import { Router } from 'express';
import {
  loginUserController, logoutUserController,
  registerUserController
} from '../controllers/loginUserController.js';

export const authRouter = Router();

authRouter.post('/login', loginUserController);
authRouter.post('/register', registerUserController);
authRouter.get('/logout', logoutUserController);