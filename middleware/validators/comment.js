const { check } = require('express-validator')

const Add = [
    check("comment").notEmpty().withMessage("comment field is required"),
    check("user").notEmpty().withMessage("user field is required"),
    check("article").notEmpty().withMessage("article field is required"),
]
 
const Edit = [ 
    check("comment").notEmpty().withMessage("comment field is required"),
    check("id").isLength({min: 10}).withMessage("id field is required"),
]
 
const Delete = [  
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

module.exports = { Add, Edit, Delete }