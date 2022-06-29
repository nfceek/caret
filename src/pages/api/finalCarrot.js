import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('update tbl ' + inData)
        var dataArr = inData.split(',')
        let wordIn = dataArr[0] 
        let availIn = parseInt(dataArr[1])
        let pendIn = parseInt(dataArr[2])
        let soldIn = parseInt(dataArr[3])                 
        let dateIn = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            word: wordIn,
           },        
        data: {
            available: availIn, 
            pending: pendIn,
            sold: soldIn,
            updateinfo: dateIn,
        },    
    });
    res.json(response)
}