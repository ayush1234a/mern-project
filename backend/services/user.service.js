const userModel = require('../models/user.model');
const userService = require('../services/user.service')

module.exports.createUser = async ({
    fullname, email, password
}) => {
    if(!fullname || !email || !password) {
        throw new Error('Please provide all fields');
}

    const user = userModel.create({
        fullname: {
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password

    })

    return user;


}
