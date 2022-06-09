import { prisma } from '../../db'

export default async(req, res) => {
    console.log('hola')
    const inData = req.body
    var dataArr = inData.split(',');
        let fName = dataArr[0]
            fName =  fName.replace(/['"]+/g, '');
        let lName = dataArr[1]
            lName =  lName.replace(/['"]+/g, '');
        let username = dataArr[2]
            username =  username.replace(/['"]+/g, '');
        let email = dataArr[3] 
            email = email.replace(/['"]+/g, '');
        let pwd = dataArr[4]
            pwd =  pwd.replace(/['"]+/g, '');             
        let chain = dataArr[5]
            chain =  chain.replace(/['"]+/g, '');                     
        let acct = dataArr[6]
            acct = acct.replace(/['"]+/g, '');   
    const curDate = new Date().toISOString()

    const response = await prisma.user.create({
        data: {
            fkwallet: 1,
            firstname: fName,
            lastname: lName,
            username: username,
            password: pwd,           
            plan: 1,
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