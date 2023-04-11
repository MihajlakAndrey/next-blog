import type { NextApiRequest, NextApiResponse } from 'next'

import { createMongoQuery } from '../../lib/utils/CreateMongoQuery'
import { getAllPosts } from '../../lib/mongoose/post'
import { AppError } from '../../lib/utils/AppError'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = createMongoQuery(req.query)

  if (req.method === 'GET') {
    try {
      const { posts, error } = await getAllPosts(query)
      if (error) throw new AppError(error.message, error.status)
      res.status(200).json(posts)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      }
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Failed to load posts',
        error,
      })
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default handler
