import { prisma } from '../../../db'

export default async(req, res) => {
    const dataE = req.body
    console.log('email in LOad: ' + dataE)
    const response = await prisma.user.findFirst({           
        where: {
            email: dataE,
          },
        })
      res.status(200).json(response)   
}