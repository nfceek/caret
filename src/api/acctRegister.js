import { prisma } from '../db'

export default async(req, res) => {
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
        let acct = dataArr[5]
            acct =  acct.replace(/['"]+/g, '');        
    const curDate = new Date().toISOString()

    const response = await prisma.user.create({
        data: {
            firstname: fName,
            lastname: lName,
            password: pwd,
            handle: username,
            avatar: '',
            admin: false,
            level: 1,
            email: email,
            email2: '', 
            account: acct,          
            account2: '',
            account3: '',
            account4: '',
            account5: '',
            join_date: curDate,
            status: 'active',
            bonus: false,
            reward: false,
            menko: true,
            vip: 1,
            skins: false,
            stickers: false,
            whitelist: false,
            twitter: '',
            tiktok: '',
            facebook: '',
            instagram: '',
            discord: '',
            youtube: '',
            project: '',
            project2: '',
            project3: '',
            skinslist: '',
            stickerslist: '',
            tbd: '',
            datecreated: curDate,
            dateupdated: curDate,

        }, 
   
    });

    res.json(response)
}