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
    { name: 'backgroundPhoto', maxCount: 1 },
    { name: 'works', maxCount: 10 },
]), jobController.addJobController)

// get all jobs
router.get("/all-jobs",jwtMiddleware,jobController.getAllJobs)

// get single job
router.get("/jobs/:id/view",jwtMiddleware,jobController.viewJobController)

module.exports = router