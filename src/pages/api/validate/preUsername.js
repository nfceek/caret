
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    
    const response = await prisma.user.count({           
        where: {
            username: data,
          },
        })
      res.status(200).json(response)   
}