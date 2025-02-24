const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const userService = require('../services/user.service.js')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charraters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 charachters long')
],

    userController.registerUser
)

//login rout for user
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 charachters long')
],
userController.loginUser
)


module.exports = router;