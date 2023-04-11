import { NextApiRequest, NextApiResponse } from 'next'

import { createComment } from '../../../lib/mongoose/comment'
import { AppError } from '../../../lib/utils/AppError'
import withProtect from '../middleware/withProtect'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const postId = req.query.id
      const { userId, text } = req.body
      const data = {
        userId,
        text,
        postId: postId as string,
      }
      const { comment, error } = await createComment(data)
      if (error) throw new AppError(error.message, error.status)
      return res.status(200).json(comment)
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
        message: 'Failed to create comment',
      })
    }
  } else {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default withProtect(handler)
