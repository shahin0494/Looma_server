const users = require("../models/userModel")
const jwt = require("jsonwebtoken")

// register
exports.registerController = async (req, res) => {
    console.log("inside registercontroller API");
    const { username, email, password, role } = req.body
    console.log(username, email, password, role);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).json("user already exists ! please login ")
        }
        // create new user
        const newUser = new users({
            username,
            email,
            password,
            role: role || "client" //default user
        })
        await newUser.save()
        res.status(200).json(newUser)
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
        if (!existingUser) {
            return res.status(404).json("invalid credentials")
        }
        if (existingUser.password !== password) {
            return res.status(401).json("invalid username / password")
        }
        // create token w/ role info
        const token = jwt.sign({ userEmail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
        res.status(200).json({ user: existingUser, token })
    } catch (err) {
        res.status(500).json(err)
    }
}