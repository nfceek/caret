import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('update tbl ' + inData)
        var dataArr = inData.split(',')
        let wordIn = dataArr[0] 

    const response = await prisma.carrots.deleteMany({
        where: {
            word: wordIn,
           },            
    });
    res.json(response)
}