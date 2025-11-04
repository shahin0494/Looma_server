const express = require("express")
const userController = require("../controllers/userControllers")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const jobController = require("../controllers/jobController")
const router = express.Router()
const multerConfig = require("../middlewares/imageMulter")

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// add job
router.post("/add-job", jwtMiddleware, multerConfig.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'backgroundPhoto', maxCount: 1 }
]), jobController.addJobController)

module.exports = router