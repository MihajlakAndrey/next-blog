import connectMongo from '../../database/connection'
import UserModel from '../../database/models/User'
import { UserDataType } from '../../types'
import { createPassHash, verifyPass } from '../utils/Password'

export const createNewUser = async (data: UserDataType & {password : string}) => {
  try {
    await connectMongo()
    const { email, password, name, image } = data
    const isUserExist = await UserModel.findOne({ email })
    if (!!isUserExist) {
      return {
        error: {
          status: 400,
          message: 'That email address is already registered',
        },
      }
    }
    const hash = await createPassHash(password)
    const user = await UserModel.create({
      email,
      name,
      passwordHash: hash,
      image,
    })
    const { passwordHash, ...userWithoutPassHash } = user._doc
    return { user: { ...userWithoutPassHash } }
  } catch (error) {
    return { error: { status: 500, message: 'Something wrong. Try later' } }
  }
}
export const updateUser = async (data: UserDataType & { userId : string }) => {
  try {
    await connectMongo()
    const { userId, name, email, image } = data
    const existingUser = await UserModel.findOne({ email })
    if (!!existingUser && existingUser._id.toString() !== userId) {
      return {
        error: {
          status: 400,
          message: 'That email address is already registered',
        },
      }
    }
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name, email, image },
      {
        new: true,
      }
    )

    if (!user) {
      return { error: { status: 404, message: 'User not found' } }
    }

    const { passwordHash, ...userWithoutPassHash } = user._doc
    const commentCount = await user.commentCount
    const postCount = await user.postCount
    return { user: { ...userWithoutPassHash, commentCount, postCount } }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Something wrong. Try later' } }
  }
}



export const login = async (data: Record<"email" | "password", string> | undefined) => {
  try {
    if(!data) return { error: 'Incorrect email or password' }
    await connectMongo()
    const user = await UserModel.findOne({ email: data.email })

    if (!user) {
      return { error: 'Incorrect email or password' }
    }
    const isValidPass = await verifyPass(data.password, user.passwordHash)

    if (!isValidPass) {
      return { error: 'Incorrect email or password' }
    }
    const { passwordHash, ...userWithoutPassHash } = user._doc

    return { user: { ...userWithoutPassHash, _id: user._id.toString() } }
  } catch (error) {
    return { error: 'Something wrong. Try later' }
  }
}

export const getUser = async (id: string) => {
  await connectMongo()

  const user = await UserModel.findById(id)
  if (!user) {
    return null
  }

  const postCount = await user?.postCount
  const commentCount = await user?.commentCount
  const { passwordHash, ...userWithoutPassHash } = user._doc
  return { ...userWithoutPassHash, postCount, commentCount }
}
