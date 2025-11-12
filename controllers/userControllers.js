const users = require("../models/userModel")
const jwt = require("jsonwebtoken")

// register
exports.registerController = async (req, res) => {
    console.log("inside registercontroller API");
    const { username, email, password, role, jobType } = req.body
    console.log(username, email, password, role, jobType);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).json("user already exists ! please login ")
        } else {
            // create new user
            const newUser = new users({
                username,
                email,
                password,
                role: role || "client" //default user
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("inside login controller api");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userEmail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(401).json("invalid email / password")
            }
        } else {
            res.status(404).json("Invalid Credentials")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


// edit user profile
exports.editUserProfileController = async (req, res) => {
    console.log("inside editUserProfileController");
    const { username, password, bio, profileImage, role, jobType } = req.body
    const email = req.payload.email
    const profile = req.file ? req.file.filename : profileImage
    try {
        const updateUser = await users.findOneAndReplace({ email }, { username, email, password, profileImage: profile, bio, role, jobType }, { new: true })
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }

}

// admin

//get all user list
exports.getAllUserLIstsController = async (req, res) => {
    console.log("inside getAllUserLIstsController");
    const email = req.payload.email
    try {
        const allUsers = await users.find({ email: { $ne: email } })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
} 

// edit admin profile
exports.adminProfileEditController = async (req,res)=>{
    console.log("inside adminProfileEditController");
    const { username, password, bio, profileImage,  jobType } = req.body
    const email = req.payload.email
    const role = req.payload.role
    const profile = req.file ? req.file.filename : profileImage
    try {
        const updateAdmin = await users.findOneAndUpdate({email},{ username, email, password, profileImage: profile, bio, role, jobType }, { new: true })
        await updateAdmin.save()
        res.status(200).json(updateAdmin)
    } catch (error) {
        res.status(500).json(err)
    }
}