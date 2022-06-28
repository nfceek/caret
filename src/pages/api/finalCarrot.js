import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('update tbl ' + inData)
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
        let availIn = dataArr[12]
        let pendIn = dataArr[13]
        let soldIn = dataArr[14]                  
    const curDate = new Date().toISOString()

    const response = await prisma.carrots.updateMany({
        where: {
            word: wordIn,
           },        
        data: {
            available: availIn, 
            pending: pendIn,
            sold: soldIn,
            price: priceIn,
            cid: cidIn,
            updateinfo: dateIn,
        },    
    });
    res.json(response)
}