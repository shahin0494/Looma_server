const express = require("express")
const userController = require("../controllers/userControllers")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const jobController = require("../controllers/jobController")
const router = express.Router()

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// add job
router.post("/add-job",jwtMiddleware,jobController.addJobController)

module.exports = router