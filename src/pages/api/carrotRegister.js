import { prisma } from '../../db'

export default async(req, res) => {
    //console.log('auto generated ')
    const inData = req.body
    var dataArr = inData.split(',');
        let emailIn = dataArr[0] 
            emailIn = emailIn.replace(/['"]+/g, '');
        let unameIn = dataArr[1] 
            unameIn = unameIn.replace(/['"]+/g, '');
        let pwdIn = dataArr[2]
            pwdIn =  pwdIn.replace(/['"]+/g, '');             
        let chainIn = dataArr[3]
            chainIn =  chainIn.replace(/['"]+/g, '');                     
        let acctIn = dataArr[4]
            acctIn = acctIn.replace(/['"]+/g, '');
        let planIn = dataArr[5]
            planIn = planIn.replace(/['"]+/g, '');
        let fkwordIn = dataArr[6]
            fkwordIn = fkwordIn.replace(/['"]+/g, '');              
    const curDate = new Date().toISOString()

    const response = await prisma.user.create({
        data: {
            fkword: parseInt(fkwordIn),
            fkwallet: 0,
            burned: 0,
            firstname: '',
            lastname: '',
            username: unameIn,
            active: 0,
            password: pwdIn,           
            plan: parseInt(planIn),
            admin: false,
            level: 1,
            email: emailIn, 
            chain: chainIn,
            account: acctIn,    
            join_date: curDate,
            dateupdated: curDate,
            caret: unameIn, 
            avatar: '', 
            fkword2: 0,
            caret2: '', 
            chain2: '', 
            account2: '', 
            fkword3: 0,
            caret3: '', 
            chain3: '', 
            account3: '', 
        }, 
   
    });

    res.json(response)
}