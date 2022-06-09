
import { prisma } from '../../db'

export default async(req, res) => {

    const inData = req.body
    var dataArr = inData.split(',');
        let username = dataArr[0]
            username =  username.replace(/['"]+/g, '');
        let pwd = dataArr[1]
            pwd =  pwd.replace(/['"]+/g, '');
        let acct = dataArr[2]
            acct =  acct.replace(/['"]+/g, '');
        const response = await prisma.user.findMany({
            where: {
                OR:[
                    {
                        account: {
                            equals: acct,
                        }
                    },
                    {                
                        AND: {
                            username: {
                                equals: username,
                            },                            
                            password: {
                                equals: pwd,
                            }
                        },
                    },                   
                ],
            },

        }) 
    res.json(response)
}