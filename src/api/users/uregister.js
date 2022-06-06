import { apiHandler, usersRepo } from '../../../helpers/api';


const bcrypt = require('bcryptjs');

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;

    // validate
    //if (usersRepo.find(x => x.username === user.username))
    //    throw `User with the username "${user.username}" already exists`;
    // TODO add api call here to validate no dupes

    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    usersRepo.create(user);
    return res.status(200).json({});
}
