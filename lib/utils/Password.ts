import bcrypt from 'bcrypt'

export const createPassHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const verifyPass = async (
  password: string | Buffer,
  passwordHash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash)
}
