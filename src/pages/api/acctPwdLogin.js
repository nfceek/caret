
import { prisma } from '../../db'

export default async(req, res) => {

    const inData = req.body
    var dataArr = inData.split(',');
        let email = dataArr[0]
            email =  email.replace(/['"]+/g, '');
        let pwd = dataArr[1]
            pwd =  pwd.replace(/['"]+/g, '');
        let acct = dataArr[2]
            acct =  acct.replace(/['"]+/g, '');
        const response = await prisma.user.findFirst({
            where: { 
                AND:[
                    {email: { equals: email, }, },                                              
                    //{password: { equals: pwd, }, },
                    ],
                },                   
            }) 
    res.json(response)
}