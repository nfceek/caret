import { prisma } from '../../../db'

export default async(req, res) => {
    //console.log('user created reg')
    const inData = req.body
    var dataArr = inData.split(',');

        let username = dataArr[1]
            username =  username.replace(/['"]+/g, '');    
        let fName = dataArr[2]
            fName =  fName.replace(/['"]+/g, '');
        let lName = dataArr[3]
            lName =  lName.replace(/['"]+/g, '');
        let email = dataArr[4] 
            email = email.replace(/['"]+/g, '');
    const curDate = new Date().toISOString()

    const response = await prisma.user.updateMany({
        where: {
            email: email,
           },        
        data: {
            firstname: fName,
            lastname: lName,
            username: username,
            dateupdated: curDate,
        }, 
   
    });

    res.json(response)
}