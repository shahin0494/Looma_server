// import dot env express cors
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("./routing/router")
require("./database/connection")

// create srver
const FreelanceServer = express()

// enable cors protocol in server
FreelanceServer.use(cors())
FreelanceServer.use(express.json())
FreelanceServer.use(router)
FreelanceServer.use("/uploads",express.static("./uploads"))

// port
const PORT = 3001

// run in port
FreelanceServer.listen(PORT,()=>{
    console.log(`freelance server started at port ${PORT}`);
    
})

// resolve http req
FreelanceServer.get("/",(req,res)=>{
    res.status(200).send("<h1> Looma  server started and recieved on browser<h1/>")
})

