import { prisma } from '../../../db'

export default async(req, res) => {
    //console.log('user created reg')
    const inData = req.body
    var dataArr = inData.split(',');
    let fEmail = dataArr[0]
        fEmail =  fEmail.replace(/['"]+/g, '');    
    let fPassword = dataArr[1]
        fPassword =  fPassword.replace(/['"]+/g, '');
    const curDate = new Date().toISOString()
    const response = await prisma.user.updateMany({
        where: {
            email: fEmail,
           },        
        data: {
            password: fPassword,
            dateupdated: curDate,
        },   
    });
    res.json(response)
}