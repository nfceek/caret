
import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('update tbl ' + inData)
    var dataArr = inData.split(','); 
    let codeIn = dataArr[0]           
    let counterIn = parseInt(dataArr[1]) 


    const response = await prisma.promo.updateMany({
        where: {
            code: codeIn,
           },        
        data: {
            counter: counterIn,
            },
    });
      res.status(200).json(response)   
}