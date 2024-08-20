import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

export const hashPassword = (plainPassword: string) => {
  try {
    return bcrypt.hashSync(plainPassword, salt);
  } catch (error) {
    console.log(error);
  }
};
export const compareHashPassword = (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return bcrypt.compareSync(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
