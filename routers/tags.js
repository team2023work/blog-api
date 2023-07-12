
const router = require("express").Router()
const TagController = require("../controllers/tags")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Edit , Add, Delete } = require("../middleware/validators/tag")
 
// list 
router.get(ApiEndpoints.Tags.list, TagController.Get)

// create
router.post(ApiEndpoints.Tags.create, authMiddleware, Add, HandleValidatorError, TagController.Add , handleError)

// edit
router.put(ApiEndpoints.Tags.edit, authMiddleware, Edit, HandleValidatorError, TagController.Edit , handleError)

// delete
router.delete(ApiEndpoints.Tags.delete, authMiddleware, Delete, HandleValidatorError, TagController.Remove, handleError)

 
module.exports = router