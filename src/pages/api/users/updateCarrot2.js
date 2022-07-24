import { prisma } from '../../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('hola ' + inData)
    var dataArr = inData.split(',');
        let useridIn = dataArr[0]
        let wordIn = dataArr[1] 
        let appendIn = parseInt(dataArr[2])
        let cidIn = dataArr[3]  
        let spKey = dataArr[4]
        let sprKey = dataArr[5]
        let pKey = dataArr[6]
        let prKey = dataArr[7]
        let promoIn = dataArr[8]

        const curDate = new Date().toISOString()

    const response = await prisma.carrots.create({
        data: {
            userid: useridIn,
            word: wordIn, 
            append: appendIn, 
            available: 0, 
            business: false, 
            pro: false, 
            premium: false, 
            banned: false, 
            pending: 0,
            sold: 1,
            price: 0,
            promo: promoIn,    
            cid: cidIn,
            ipfs: '1',
            cidw: '',
            sitepublickey: spKey,
            siteprivatekey: sprKey,
            publickey: pKey,
            privkey: prKey,
            timestamp: curDate,
            updateinfo: curDate,
        },    
    });
    res.json(response)
}