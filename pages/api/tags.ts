import { NextApiRequest, NextApiResponse } from 'next'

import { getAllTags } from '../../lib/mongoose/post'
import { AppError } from '../../lib/utils/AppError'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { tags, error } = await getAllTags()
      if (error) throw new AppError(error.message, error.status)
      res.json(tags)
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
        message: 'Fail to load tags',
        error,
      })
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default handler
