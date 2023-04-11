import { NextApiRequest, NextApiResponse } from 'next'

import { RegistrValidation } from '../Validations'
import { createNewUser } from '../../../lib/mongoose/user'
import { AppError } from '../../../lib/utils/AppError'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await RegistrValidation.validate(req.body)
      const { user, error } = await createNewUser(req.body)
      if (error) throw new AppError(error.message, error.status)
      res.status(200).json(user)
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
        error
      })
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
}

export default handler
