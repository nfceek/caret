
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('pre: ' + data)
    const response = await prisma.user.count({           
        where: {
            account: data,
          },
        })
      res.status(200).json(response)   
}