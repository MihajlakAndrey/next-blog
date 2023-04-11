import { NextApiRequest, NextApiResponse } from 'next'

import { deleteComment } from '../../../lib/mongoose/comment'
import { AppError } from '../../../lib/utils/AppError'
import withProtect from '../middleware/withProtect'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { _id: commentId, userId } = req.body
    try {
      const { error } = await deleteComment({commentId, userId})
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
        message: 'Failed to delete comment',
      })
    }
  } else {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default withProtect(handler)
