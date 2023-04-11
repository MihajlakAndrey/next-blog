import connectMongo from '../../database/connection'
import CommentModel from '../../database/models/Comment'
import PostModel from '../../database/models/Post'
import { PostDataType, PostType } from '../../types'

export const getAllTags = async () => {
  try {
    await connectMongo()
    const posts: PostType[] = await PostModel.find()
    const tags: string[] = []
    posts.forEach((element: PostType) => {
      tags.push(...element.tags)
    })

    return { tags: [...Array.from(new Set(tags))] }
  } catch (error) {
    return { error: { status: 500, message: 'Failed to get tags' } }
  }
}

export const getAllPosts = async (query: any) => {
  try {
    await connectMongo()
    const posts = await PostModel.find(query.find)
      .sort(query.sort)
      .populate('owner', '-passwordHash')
    return { posts }
  } catch (error) {
    console.log(error)
    return { error: { message: 'Failet to get posts', status: 500 } }
  }
}

export const getOnePost = async (postId: string) => {
  try {
    await connectMongo()
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        new: true,
      }
    )
      .populate('owner', '-passwordHash')
      .populate({
        path: 'comments',
        populate: { path: 'owner', select: '-passwordHash' },
        options: { sort: { createdAt: -1 } },
      })

    if (!post) {
      return { error: { status: 404, message: 'Post not found' } }
    }

    return { post }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Failed to get post' } }
  }
}

export const createPost = async (data: PostDataType & { userId: string }) => {
  try {
    await connectMongo()
    const { userId, title, text, tags, image } = data
    const post = await PostModel.create({
      title,
      text,
      tags,
      image,
      owner: userId,
    })
    return { post: { ...post._doc } }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Something wrong. Try later' } }
  }
}

export const updatePost = async (
  data: PostDataType & { postId: string; userId: string }
) => {
  try {
    await connectMongo()
    const { postId, userId, title, text, tags, image } = data
    const post = await PostModel.findById(postId)

    if (!post) {
      return { error: { status: 404, message: 'Post not found' } }
    }

    if (post.owner.toString() !== userId) {
      return { error: { status: 400, message: 'No access' } }
    }

    await post.updateOne({
      title,
      text,
      tags,
      image,
    })
    return { post }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Something wrong. Try later' } }
  }
}

export const deletePost = async (data: { postId: string; userId: string }) => {
  try {
    await connectMongo()
    const post = await PostModel.findById(data.postId)
    if (!post) {
      return { error: { status: 404, message: 'Post not found' } }
    }

    if (post.owner.toString() !== data.userId) {
      return { error: { status: 400, message: 'No access' } }
    }

    await CommentModel.deleteMany({ _id: { $in: post.comments } })
    await post.remove()

    return { success: true }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Something wrong. Try later' } }
  }
}
