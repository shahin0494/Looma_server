const express = require("express")
const userController = require("../controllers/userControllers")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const router = express.Router()

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

module.exports = router