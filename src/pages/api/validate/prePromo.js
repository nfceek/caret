
import { prisma } from '../../../db'

export default async(req, res) => {
    
    const data = JSON.parse(req.body)
    //console.log('req ' + data)
    const response = await prisma.promo.findMany({           
        where: {
            code: data,
        },
    });
      res.status(200).json(response)   
}