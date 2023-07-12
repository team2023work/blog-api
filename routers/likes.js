
const router = require("express").Router()
const LikeController = require("../controllers/likes")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Add, Delete } = require("../middleware/validators/like")
 
// list  
router.get(ApiEndpoints.Likes.list, LikeController.Get)

// create
router.post(ApiEndpoints.Likes.create, authMiddleware, Add, HandleValidatorError, LikeController.Add , handleError)

// delete
router.delete(ApiEndpoints.Likes.delete, authMiddleware, Delete, HandleValidatorError, LikeController.Remove, handleError)

 
module.exports = router