const { check } = require('express-validator')

const Add = [
    check("name").notEmpty().withMessage("name field is required"),
] 

const Edit = [ 
   // check("name").notEmpty().withMessage("name field is required"),
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

const Delete = [ 
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

module.exports = { Add, Edit, Delete }