const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { fullname, email, password } = req.body;



    const hashedPassword = await userModel.hashPassword(password);


    const newUser = await userService.createUser({
        fullname,
        email,
        password: hashedPassword
    });

    const token = newUser.generateAuthtoken();
    res.status(201).json({ user: newUser, token });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;

    //now it will check the email is exist or not
    //for that particular time when you fetch the email(when you find the user ) at this movment also fetch the password for configration or giving the accses
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthtoken();

    res.status(200).json({ token, user });


}
