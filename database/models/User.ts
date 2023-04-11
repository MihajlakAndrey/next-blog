import mongoose, { Document } from 'mongoose'

import CommentModel from './Comment'
import PostModel from './Post'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  image?: string
  postCount: number
  commentCount: number
  createdAt: Date | string
  updateAt: Date | string
  _doc: IUser
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    image: String,
  },

  {
    timestamps: true,
  }
)
//@ts-ignore
mongoose.models = {}

UserSchema.virtual('postCount').get(async function () {
  const postCount = (await PostModel.find({ owner: this._id })).length
  return postCount
})
UserSchema.virtual('commentCount').get(async function () {
  const commentCount = (await CommentModel.find({ owner: this._id })).length
  return commentCount
})
const UserModel = mongoose.model<IUser>('User', UserSchema)
export default UserModel
