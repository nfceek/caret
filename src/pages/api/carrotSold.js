
import { prisma } from '../../db'

export default async(req, res) => {    
    
  var inData = req.body
  //console.log('Sales tbl: ' + inData)
  var dataArr = inData.split(',');
    let emailIn = dataArr[0] 
    let wordIn = dataArr[1]                              
    let priceIn = parseInt(dataArr[3])                               
    let salesdate = dataArr[8]  
    let planIn = parseInt(dataArr[10])
    let promoIn = dataArr[11]                    
    const curDate = new Date().toISOString()
  
  const response = await prisma.sales.create({
      data: {
        new: 1,
        pending: 1,
        sold: 0, 
        addon: 0,
        email: emailIn,
        word: wordIn, 
        price: priceIn,
        plan: planIn,
        salesdate: salesdate,
        referral: '',
        region: '',
        promo: '',
      },  
  });
  res.json(response)
}