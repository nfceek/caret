import { prisma } from '../../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('hola ' + inData)
    var dataArr = inData.split(',');
        let wordIn = dataArr[0] 
        let cidIn = dataArr[1]  
        let spKey = dataArr[2]
        let sprKey = dataArr[3]
        let pKey = dataArr[4]
        let prKey = dataArr[5]

        const curDate = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            word: wordIn,
           },        
        data: {
            cid: cidIn,
            ipfs: '1',
            sitepublickey: spKey,
            siteprivatekey: sprKey,
            publickey: pKey,
            privkey: prKey,
            updateinfo: curDate,
        },    
    });
    res.json(response)
}