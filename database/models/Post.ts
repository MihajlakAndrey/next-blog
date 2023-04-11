import mongoose, { Document, PopulatedDoc } from 'mongoose'

import { IComment } from './Comment'
import { IUser } from './User'

export interface IPost extends Document {
  title: string
  text: string
  tags: string[]
  image?: string
  comments: mongoose.Schema.Types.ObjectId[] &
    PopulatedDoc<Document<IComment[]>>
  owner: mongoose.Schema.Types.ObjectId & PopulatedDoc<Document<IUser>>
  viewsCount: number
  createdAt: Date
  updateAt: Date
  _doc: IPost
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    image: String,

    viewsCount: {
      type: Number,
      default: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
  },

  {
    timestamps: true,
  }
)

//@ts-ignore
 mongoose.models = {}


const PostModel = mongoose.model<IPost>('Post', PostSchema)
export default PostModel
