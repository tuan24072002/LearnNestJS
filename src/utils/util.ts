import bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

export const hashPassword = (plainPassword: string) => {
  try {
    return bcrypt.hashSync(plainPassword, salt);
  } catch (error) {
    console.log(error);
  }
};
