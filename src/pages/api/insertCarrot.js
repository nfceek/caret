import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    console.log('hola ' + inData)
    var dataArr = inData.split(',');
        let useridIn = dataArr[0]          
        let wordIn = dataArr[1]            
        let appendIn = parseInt(dataArr[2])                      
        let priceIn = parseInt(dataArr[3])                               
        let spubkeyIn = dataArr[4]           
        let sprvkeyIn = dataArr[5]
        let pubkeyIn = dataArr[6]           
        let prvkeyIn = dataArr[7]
        let dateIn = dataArr[8]                       
    const curDate = new Date().toISOString()
    
    const response = await prisma.carrots.create({
        data: {
            userid: 0,
            word: wordIn, 
            append: appendIn, 
            available: false, 
            business: false, 
            pro: false, 
            premium: false, 
            banned: false, 
            sold: true,
            price: priceIn,
            cid: '0', 
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