/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '../utils/user.util';
import codemodel from '../models/code'

//get all users
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//create new user
export const newUser = (userdetail) => {
  return new Promise(async (resolve, reject) => {
    const hash = await bcrypt.hash(userdetail.password, 10);
    userdetail.password = hash;
    User.create(userdetail)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Login Admin or User
export const login = async (info) => {
  const userPresent = await User.findOne({ email:info.email });
  if (userPresent) {
    const match = await bcrypt.compare(info.password, userPresent.password);
    if (match) {
      const token = jwt.sign({email:userPresent.email, id: userPresent._id, role: userPresent.role},process.env.SECRET_KEY);
      return token;
    } else {
      return "Incorrect Password"
    }
  } else {
    return "Not Registered Yet";
  }
};

//ForgotPassword for Admin or User
export const forgotPassword = (info) => {
  return new Promise((resolve,reject)=>{
    User.findOne({ email:info.email },(error,userPresent)=>{
      if (userPresent) {
       const mailResult= sendResetEmail(userPresent.email);
        resolve(mailResult);
      } else {
        reject("Not Registered Yet");
      }
    });
  })
};

//ResetPassword for Admin or User
export const resetPassword = (credential) => {
return new Promise((resolve,reject)=>{
  codemodel.findOne({ email:credential.email,resetcode:credential.resetcode })
  .then(async (data)=>{
    const hash = await bcrypt.hash(credential.newPassword, 10);
      User.findOneAndUpdate({email:data.email},{password:hash}, {new:true})
      .then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject("password is not update")
      })
  }).catch(error=>{
    reject("code expired");
  })
})
};

