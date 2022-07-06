
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('emailcheck: ' + data)
    const response = await prisma.user.count({           
        where: {
            email: data,
          },
        })
      res.status(200).json(response)   
}