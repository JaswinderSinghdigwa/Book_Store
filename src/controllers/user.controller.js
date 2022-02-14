/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    UserService.getAllUsers()
      .then((data) => {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'All users fetched successfully'
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = (req, res, next) => {
  try {
    const userdetail = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };
    UserService.newUser(userdetail)
      .then((data) => {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User created successfully'
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Login Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const login = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      password: req.body.password
    }
    const data = await UserService.login(info);
    if (data == "Not Registered Yet") {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Not Registered Yet'
      });
    // eslint-disable-next-line quotes
    } else if (data == "Incorrect Password") {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect Password'
      });
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Login Successful',
        token: data
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to ForgotPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const forgotPassword = (req, res, next) => {
  try {
    const info = {
      email: req.body.email
    }
    UserService.forgotPassword(info)
    .then(data=>{
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Reset-code Sent to your Email'
        });
    }).catch(error =>{
      if(error=="Not Registered Yet")
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Not Registered Yet'
      });
    })
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to ResetPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const resetPassword = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      newPassword: req.body.newPassword,
      resetcode: req.body.resetcode
    }
    UserService.resetPassword(info)
    .then((data)=>{
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Password reset successfull'
      });
    }).catch((error) => {
      if(error === "code expired"){
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'Reset-code is expired, Request new Reset-code'
        });
      }
    });
  } catch (error) {
    next(error);
  }
}