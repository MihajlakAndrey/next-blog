import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const withProtect = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getSession({ req })

      if (session) {
        req.body.userId = session?.user?._id
        return handler(req, res)
      } else {
        return res.status(401).json({
          success: false,
          message: 'No access',
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        success: false,
        message: 'No access',
      })
    }
  }
}

export default withProtect
