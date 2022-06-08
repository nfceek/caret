import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export default async(req, res) => {
    const data = JSON.parse(req.body)
    const createdNft = await prisma.nftmaster.update({            
        where: {
           id: data,
          },
          data: {
            sold: 'true',
          },
        })
 
    res.json(createdNft)
}