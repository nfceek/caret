
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('pre: ' + data)
    const response = await prisma.$queryRaw`SELECT MAX(id) as max FROM User;`
    
      res.status(200).json(response)   
}