import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('hola ' + inData)
    var dataArr = inData.split(',');

        let emailIn = dataArr[0]           
        let wordIn = dataArr[1]  
        let cidIn = dataArr[2]  
    const curDate = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            word: wordIn,
           },        
        data: {
            ipfs: cidIn,
            updateinfo: curDate,
        },    
    });
    res.json(response)
}