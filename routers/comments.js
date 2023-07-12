
const router = require("express").Router()
const CommentsController = require("../controllers/comments")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Edit , Add, Delete } = require("../middleware/validators/comment")
 
// list 
router.get(ApiEndpoints.Comments.list, CommentsController.Get)

// create
router.post(ApiEndpoints.Comments.create, authMiddleware, Add, HandleValidatorError, CommentsController.Add , handleError)

// edit
router.put(ApiEndpoints.Comments.edit, authMiddleware, Edit, HandleValidatorError, CommentsController.Edit , handleError)

// delete
router.delete(ApiEndpoints.Comments.delete, authMiddleware, Delete, HandleValidatorError, CommentsController.Remove, handleError)

 
module.exports = router