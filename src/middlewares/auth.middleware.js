
export const setRole = (role) => {
  return (req, res, next) => {
    console.log('role ', role);
    req.body.role = role;
    next();
  };
};
