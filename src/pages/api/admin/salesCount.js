
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('sales query ' + data)
    const response = await prisma.sales.count({           
        where: {
            sold: 1,
            plan: data
          },
        })
      res.status(200).json(response)   
}