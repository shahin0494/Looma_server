const express = require("express")
const userController = require("../controllers/userControllers")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const jobController = require("../controllers/jobController")
const router = express.Router()
const multerConfig = require("../middlewares/imageMulter")
const adminMiddleware = require("../middlewares/adminJwtMiddleware")

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// Googlelogin
router.post('/google-login', userController.googleLoginController)

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

// update user profile
router.put("/user-profile/edit", jwtMiddleware, multerConfig.single("profileImage"),userController.editUserProfileController)

// get all user jobs
router.get("/user-jobs",jwtMiddleware,jobController.getAllUserUploadJobsController)

// delete user jobs
router.delete("/user-jobs/:id/remove", jwtMiddleware, jobController.deleteUserJobController)

// get all user bought jobs
router.get("/user-bought-jobs",jwtMiddleware,jobController.getAllUserBoughtJobsController)

// admin

// get all users
router.get("/all-users",adminMiddleware,userController.getAllUserLIstsController)

// update admin profile
router.put("/admin-profile/edit", adminMiddleware, multerConfig.single("profileImage"),userController.adminProfileEditController)

// admin get all jobs
router.get("/admin-all-jobs",adminMiddleware,jobController.getAllJobsAdminController)

// admin approve job
router.put("/admin/jobs/approve",adminMiddleware,jobController.updateJobStatusController)

module.exports = router