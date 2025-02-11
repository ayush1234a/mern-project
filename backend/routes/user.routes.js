const express = require('express');
const router = express.Router();
const { body } = rewuire("express-validator");
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charraters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 charachters long')
],

    userController.registerUser
);


module.express = router;