import { NextApiRequest, NextApiResponse } from 'next'

import { updateUser } from '../../../lib/mongoose/user'
import withProtect from '../middleware/withProtect'
import { AppError } from '../../../lib/utils/AppError'
import { UpdateValidation } from '../Validations'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, name, email, image } = req.body
  if (req.method === 'POST') {
    try {
      await UpdateValidation.validate(req.body)
      const { user, error } = await updateUser({ userId, name, email, image })
      if (error) throw new AppError(error.message, error.status)

      return res.status(200).json(user)
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
        error,
      })
    }
  }
  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}

export default withProtect(handler)
