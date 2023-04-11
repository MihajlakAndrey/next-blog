import type { NextApiRequest, NextApiResponse } from 'next'

import { getOnePost } from '../../../lib/mongoose/post'
import { AppError } from '../../../lib/utils/AppError'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id: postId } = req.query
    try {
      const { post, error } = await getOnePost(postId as string)
      if (error) throw new AppError(error.message, error.status)
      res.status(200).json(post)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      }
      res.status(500).json({
        success: false,
        message: 'Failed to load post',
        error,
      })
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default handler
