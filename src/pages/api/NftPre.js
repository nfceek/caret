import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export default async(req, res) => {
    const data = JSON.parse(req.body)
    const response = await prisma.nftmaster.findMany({           
        where: {
           id: data,
          },
          select: {
            sold: true,
          },
        })
      res.status(200).json(response)  
      
}