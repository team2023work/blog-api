
const router = require("express").Router()
const CategoryController = require("../controllers/categories")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Edit , Add, Delete } = require("../middleware/validators/category")
 
// list 
router.get(ApiEndpoints.Categories.list, CategoryController.Get)

// create
router.post(ApiEndpoints.Categories.create, authMiddleware, Add, HandleValidatorError, CategoryController.Add , handleError)

// edit
router.put(ApiEndpoints.Categories.edit, authMiddleware, Edit, HandleValidatorError, CategoryController.Edit , handleError)

// delete
router.delete(ApiEndpoints.Categories.delete, authMiddleware, Delete, HandleValidatorError, CategoryController.Remove, handleError)

 
module.exports = router