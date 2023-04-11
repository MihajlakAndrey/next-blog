import type { NextApiRequest, NextApiResponse } from 'next'

import { createPost } from '../../../../lib/mongoose/post'
import { AppError } from '../../../../lib/utils/AppError'
import withProtect from '../../middleware/withProtect'
import { PostCreateValidation } from '../../Validations'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await PostCreateValidation.validate(req.body)
      const { userId, text, title, tags, image } = req.body
      const { post, error } = await createPost({
        userId,
        text,
        title,
        tags,
        image,
      })
      if (error) throw new AppError(error.message, error.status)
      return res.status(200).json(post)
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
        message: 'Failed to create post',
        error,
      })
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default withProtect(handler)
