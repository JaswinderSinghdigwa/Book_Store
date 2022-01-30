import User from '../models/user.model';

//get all users
export const getAllUsers = () => {
  return new Promise((resolve,reject)=>{
    User.find()
    .then(data=>{
      resolve(data)
    }).catch(error=>{
      reject(error)
    })
  })
}
 

//create new user
export const newUser = (userdetail) => {
  return new Promise(async (resolve,reject)=>{
    const hash = await bcrypt.hash(userdetail.password, 10);
    userdetail.password = hash;
    User.create(userdetail)
  .then(data=>{
    resolve(data)
  }).catch(error=>{
    reject(error)
  })
})
}
  


