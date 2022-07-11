
import { prisma } from '../../../db'

export default async(req, res) => {
    const data = req.body
    //console.log('av check: ' + req.body)
    const response = await prisma.$queryRaw`SELECT word, available FROM carrots WHERE word = ${data};`

    res.status(200).json(response)   
}