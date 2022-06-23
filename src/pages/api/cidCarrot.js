import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('hola ' + inData)
    var dataArr = inData.split(',');
        let userIn = dataArr[0]            
        let cidIn = dataArr[1]  
        const curDate = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            userid: userIn,
           },        
        data: {
            ipfs: cidIn,
            cidw: 'pinned',
            updateinfo: curDate,
        },    
    });
    res.json(response)
}