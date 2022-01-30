import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import {setRole} from '../middlewares/auth.middleware'

const router = express.Router();
router.get('/get', userController.getAllUsers);

router.post('/user', newUserValidator, setRole('user'), userController.newUser);
//route to register users for admin
router.post('/admin', newUserValidator, setRole('admin'), userController.newUser);

export default router;
