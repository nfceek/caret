import { prisma } from '../../../db'

export default async(req, res) => {
    const dataC = req.body
    console.log('email in LOad: ' + dataC)
    const response = await prisma.carrots.findFirst({           
        where: {
            word: dataC,
          },
        })
      res.status(200).json(response)   
}