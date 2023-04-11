import mongoose from 'mongoose'

import CommentModel from './models/Comment'
import PostModel from './models/Post'
import UserModel from './models/User'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environment variable')
}

let mongoClient: any = null

const connectMongo = async () => {
  try {
    if (mongoClient) {
      return mongoClient
    }

    await mongoose.set('strictQuery', true)
    mongoClient = await mongoose.connect(MONGODB_URI)
    const models = [PostModel, UserModel, CommentModel]
    console.log('Database connected')
  } catch (error) {
    console.log('Database error')
    console.log(error)
  }
}

export default connectMongo
