import { prisma } from '../../../db'
import preCarrotUserId from '../validate/preCarrotUserId';

export default async(req, res) => {
    //console.log('user created reg')
    const inData = req.body
    var dataArr = inData.split(',');
        
        let email = dataArr[0]
        let pChain = dataArr[1] 
        let pAccount = dataArr[2]
        let pCaret = dataArr[3]
     
        const curDate = new Date().toISOString()

    const response = await prisma.user.updateMany({
        where: {
            email: email,
           },        
        data: {
            fkword2: 1,
            caret2:pCaret,
            chain2: pChain,
            account2: pAccount,
            dateupdated: curDate,
        }, 
   
    });

    res.json(response)
}