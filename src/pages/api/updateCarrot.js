import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('hola ' + inData)
    var dataArr = inData.split(',');           
        let wordIn = dataArr[1]            
        let appendIn = parseInt(dataArr[2])                       
        let priceIn = parseInt(dataArr[3])                               
        let spubkeyIn = dataArr[4]           
        let sprvkeyIn = dataArr[5]
        let pubkeyIn = dataArr[6]           
        let prvkeyIn = dataArr[7] 
        let dateIn = dataArr[8]                     
    const curDate = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            word: wordIn,
           },        
        data: {
            append: appendIn, 
            available: false, 
            sold: true,
            price: priceIn,
            sitepublickey: spubkeyIn,
            siteprivatekey: sprvkeyIn,
            publickey: pubkeyIn,
            privkey: prvkeyIn,
            timestamp: dateIn,
            updateinfo: dateIn,
        },    
    });
    res.json(response)
}