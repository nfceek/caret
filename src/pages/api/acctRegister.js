import { prisma } from '../../db'

export default async(req, res) => {
    //console.log('user created reg')
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
    const curDate = new Date().toISOString()

    const response = await prisma.user.create({
        data: {
            fkword: 0,
            fkwallet: 0,
            fkbanned: 0, 
            firstname: fName,
            lastname: lName,
            username: username,
            active: 1,
            password: pwd,           
            plan: 1,
            admin: false,
            level: 1,
            email: email, 
            chain: '',
            account: '',    
            join_date: curDate,
            dateupdated: curDate,
            caret: '', 
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