const { check } = require('express-validator')
 
const Add = [
    check("title").notEmpty().withMessage("title field is required"),
    check("description").notEmpty().withMessage("description field is required"),
    check("videoUrl").notEmpty().withMessage("videoUrl field is required"),
    check("visible").notEmpty().withMessage("visible field is required"),
    check("photo").notEmpty().withMessage("photo field is required"),
    check("category").notEmpty().withMessage("category field is required"),
    check("tags").notEmpty().withMessage("tags field is required"),
    check("user").notEmpty().withMessage("user field is required"),
]

const Edit = [
    // check("title").notEmpty().withMessage("title field is required"),
    // check("description").notEmpty().withMessage("description field is required"),
    // check("videoUrl").notEmpty().withMessage("videoUrl field is required"),
    // check("visible").notEmpty().withMessage("visible field is required"),
    // check("phpto").notEmpty().withMessage("phpto field is required"),
    // check("category").notEmpty().withMessage("category field is required"),
    // check("tags").notEmpty().withMessage("tags field is required"),
    // check("user").notEmpty().withMessage("user field is required"),
    check("id").isLength({min: 10}).withMessage("id field is required"),
]


const Delete = [
    check("id").isLength({min: 10}).withMessage("id field is required"),
]

module.exports = { Add, Edit, Delete }