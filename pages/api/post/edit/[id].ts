import type { NextApiRequest, NextApiResponse } from 'next'

import { deletePost, updatePost } from '../../../../lib/mongoose/post'
import { AppError } from '../../../../lib/utils/AppError'
import withProtect from '../../middleware/withProtect'
import { PostCreateValidation } from '../../Validations'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const { id: postId } = req.query
    const { title, text, tags, image, userId } = req.body

    const data = {
      title,
      text,
      tags,
      image,
      userId: userId as string,
      postId: postId as string,
    }
    try {
      await PostCreateValidation.validate(req.body)
      const { post, error } = await updatePost(data)
      if (error) throw new AppError(error.message, error.status)
      return res.status(200).json(post)
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to update post',
        error,
      })
    }
  }

  if (req.method === 'DELETE') {
    const { userId } = req.body
    const { id: postId } = req.query
    const data = {
      userId: userId as string,
      postId: postId as string,
    }

    try {
      const { error } = await deletePost(data)
      if (error) throw new AppError(error.message, error.status)

      return res.status(200).json({
        success: true,
      })
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      }
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Failed to delete post',
        error,
      })
    }
  } else {
    return res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed` })
  }
}

export default withProtect(handler)
