
const router = require("express").Router()
const MediaController = require("../controllers/media")
const handleError = require("../middleware/handleError")
const authMiddleware = require("../middleware/jwt/authMiddleware")
const HandleValidatorError = require("../middleware/HandleValidatorError")
const { singleMedia } = require("../common/uploader")
const { ApiEndpoints } = require("../common/apiEndpoints")
const { View } = require("../middleware/validators/media")

// view 
router.get(ApiEndpoints.Media.view, View, HandleValidatorError, MediaController.getMedia, handleError)

// create
router.post(ApiEndpoints.Media.create, authMiddleware, singleMedia("./images", "image") , MediaController.createMedia , handleError)


module.exports = router