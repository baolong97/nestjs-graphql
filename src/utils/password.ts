import * as bcrypt from 'bcrypt';
export async function getHashPassword(password) {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}
export async function comparePassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
