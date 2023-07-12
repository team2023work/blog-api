
const router = require("express").Router()
const ArticleController = require("../controllers/articles")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Edit , Add, Delete } = require("../middleware/validators/article")

// list 
router.get(ApiEndpoints.Article.list, ArticleController.Get)

// create
router.post(ApiEndpoints.Article.create, authMiddleware, Add, HandleValidatorError, ArticleController.Add , handleError)

// edit 
router.put(ApiEndpoints.Article.edit, authMiddleware, Edit, HandleValidatorError, ArticleController.Edit , handleError)

// remove
router.delete(ApiEndpoints.Article.signal, authMiddleware, Delete, HandleValidatorError, ArticleController.Remove, handleError)


module.exports = router