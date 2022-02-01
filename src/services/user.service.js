import User from '../models/user.model';

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
export const login = (info) => {
  User.findOne({ email: info.email })
    .then((userPresent) => {
      const match = bcrypt.compare(info.password, userPresent.password);
      if (match) {
        const token = jwt
          .sign(
            {
              email: userPresent.email,
              id: userPresent._id,
              role: userPresent.role
            },
            process.env.SECRET_KEY
          )
          .then((resolve) => {
            resolve(token);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('Incorrect Password');
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      resolve('Not Registered Yet');
    });
};
