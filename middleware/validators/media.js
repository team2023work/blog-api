const { check } = require('express-validator')

const View = [ 
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

module.exports = { View }