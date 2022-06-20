
import { prisma } from '../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    console.log('email in: ' + data)
    const response = await prisma.user.findFirst({           
        where: {
            email: data,
          },
        })
      res.status(200).json(response)   
}