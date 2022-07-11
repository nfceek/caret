
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('user query ' + data)
    const response = await prisma.user.count({           
        where: {
            active: data,
          },
        })
      res.status(200).json(response)   
}