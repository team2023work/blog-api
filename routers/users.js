
const router = require("express").Router()
const UserController = require("../controllers/users")
const handleError = require("../middleware/handleError")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { Edit , Login , SignUp , Forgot, Reset } = require("../middleware/validators/user")

// list 
router.get(ApiEndpoints.Users.list, authMiddleware, UserController.Get ,handleError)

// me
router.get(ApiEndpoints.Users.me, authMiddleware, UserController.Me , handleError)

// signup
router.post(ApiEndpoints.Users.signup, SignUp, HandleValidatorError, UserController.Signup)

// login
router.post(ApiEndpoints.Users.login , Login, HandleValidatorError, UserController.Login)

// edit 
router.put(ApiEndpoints.Users.edit, authMiddleware, Edit, HandleValidatorError, UserController.Edit , handleError)

// forgot
router.put(ApiEndpoints.Users.forgot, Forgot, HandleValidatorError, UserController.Forgot)

// reset
router.put(ApiEndpoints.Users.reset, authMiddleware, Reset, HandleValidatorError, UserController.Reset, handleError)


module.exports = router