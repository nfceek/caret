import { prisma } from '../../db'

export default async(req, res) => {
    //console.log('hola')
    const inData = req.body
    var dataArr = inData.split(',');
        let email = dataArr[0] 
            email = email.replace(/['"]+/g, '');
        let uname = dataArr[1] 
            uname = uname.replace(/['"]+/g, '');
        let pwd = dataArr[2]
            pwd =  pwd.replace(/['"]+/g, '');             
        let chain = dataArr[3]
            chain =  chain.replace(/['"]+/g, '');                     
        let acct = dataArr[4]
            acct = acct.replace(/['"]+/g, '');
        let plan = dataArr[5]
            plan = plan.replace(/['"]+/g, '');              
    const curDate = new Date().toISOString()

    const response = await prisma.user.create({
        data: {
            fkword: 0,
            fkwallet: 0,
            fkbanned: 0,
            firstname: '',
            lastname: '',
            username: uname,
            password: pwd,           
            plan: parseInt(plan),
            admin: false,
            level: 1,
            email: email, 
            chain: chain,
            account: acct,    
            join_date: curDate,
            dateupdated: curDate,
        }, 
   
    });

    res.json(response)
}