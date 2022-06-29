import { prisma } from '../../db'

export default async(req, res) => {
    
    const inData = req.body
    //console.log('update tbl ' + inData)
        var dataArr = inData.split(',')
        let wordIn = dataArr[0] 
        let banIn = parseInt(dataArr[4])    
        let activeIn = parseInt(dataArr[5])                 
        let dateIn = new Date().toISOString()

    const response = await prisma.user.updateMany({
        where: {
            caret: wordIn,
           },        
        data: {
            burned: banIn,
            active: activeIn, 
            dateupdated: dateIn,
        },    
    });
    res.json(response)
}