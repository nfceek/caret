import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('carrot tbl: ' + inData)
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
        let cidIn = dataArr[9] 
        let availIn = parseInt(dataArr[12])
        let pendIn = parseInt(dataArr[13])
        let soldIn = parseInt(dataArr[14])
        let promoIn = dataArr[15]
        let ipfsIn = dataArr[16]
        const curDate = new Date().toISOString()
    
    const response = await prisma.carrots.create({
        data: {
            userid: useridIn,
            word: wordIn, 
            append: appendIn, 
            available: availIn, 
            business: false, 
            pro: false, 
            premium: false, 
            banned: false, 
            pending: pendIn,
            sold: soldIn,
            price: priceIn,
            promo: promoIn,
            cid: cidIn, 
            ipfs: ipfsIn,
            cidw: '',
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