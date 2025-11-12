const jwt = require("jsonwebtoken");


const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware");
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    try {
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
        console.log(jwtResponse);
        req.payload = {
            email: jwtResponse.userEmail,
            role: jwtResponse.role
        }
        // Check admin role
        if (jwtResponse.role === "admin") {
            next(); // ✅ Authorized admin
        } else {
            res.status(401).json("unauthorised user"); // ❌ Not admin
        }
    } catch (err) {
        res.status(401).json("invalid token", err)
    }
}

module.exports = jwtMiddleware