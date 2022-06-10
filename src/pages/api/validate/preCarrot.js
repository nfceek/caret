import { prisma } from '../../../db'

export default async(req, res) => {
    const data = JSON.parse(req.body)
    console.log('got data ' + data)
    const response = await prisma.carrots.findMany({ 
            where: {                   
                word: data
            },
        })
      res.status(200).json(response)   
}