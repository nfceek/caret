
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('admin query ' + data)
    const response = await prisma.user.count({           
        where: {
            admin: data,
          },
        })
      res.status(200).json(response)   
}