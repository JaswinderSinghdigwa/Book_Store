/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { setRole, auth, verifyRole } from '../middlewares/auth.middleware';


const router = express.Router();
router.get('/get', userController.getAllUsers);

router.post('/user', newUserValidator, setRole('user'), userController.newUser);

//route to register users for admin
router.post(
  '/admin',
  newUserValidator,
  setRole('admin'),
  userController.newUser
);

//route to login users for admin
router.post('/login', userController.login);

//route to login users for admin
router.post('/forgotpassword', userController.forgotPassword);

//route to login users for admin
router.post('/resetPassword', userController.resetPassword);




export default router;
