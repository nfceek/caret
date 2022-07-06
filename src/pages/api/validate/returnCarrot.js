
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    //console.log('check: ' + data)
    const response = await prisma.carrots.findFirst({ 
            where: {                   
                word: data,
            },
        })
      res.status(200).json(response)   
}