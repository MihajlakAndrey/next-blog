import mongoose, { Document, PopulatedDoc } from 'mongoose'
import { IPost } from './Post'
import { IUser } from './User'

export interface IComment extends Document {
  text: string
  relatedPost: mongoose.Schema.Types.ObjectId & PopulatedDoc<Document<IPost>>
  owner: mongoose.Schema.Types.ObjectId & PopulatedDoc<Document<IUser>>
  createdAt: Date | string
  updateAt: Date | string
  _doc: IComment
}

const CommentShema = new mongoose.Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

//@ts-ignore
 mongoose.models = {}

const CommentModel =  mongoose.model<IComment>('Comment', CommentShema)

export default CommentModel
