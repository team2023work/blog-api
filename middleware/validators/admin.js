const { check } = require('express-validator')

const Login = [
    check("email").notEmpty().withMessage("email field is required"),
    check("password").notEmpty().withMessage("password field is required"),
] 


const Create = [
    check("fullname").notEmpty().withMessage("fullname field is required"),
    check("email").notEmpty().withMessage("email field is required"),
    check("password").notEmpty().withMessage("password field is required"),
]

const Forgot = [
    check("email").notEmpty().withMessage("email field is required"),
]

const Reset = [
    check("oldPass").notEmpty().withMessage("oldPass field is required"),
    check("newPass").notEmpty().withMessage("newPass field is required"),
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

const Edit = [
    //check("fullname").notEmpty().withMessage("fullname field is required"),
    //check("email").notEmpty().withMessage("email field is required"),
    check("id").isLength({min: 10}).withMessage("id field is required"),
]


module.exports = { Edit, Login, Create, Forgot, Reset }