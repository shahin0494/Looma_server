const mongoose = require("mongoose")

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res => {
    console.log("freelance server connected to mongodb");
}).catch(err => {
    console.log("server connection to mongodb failed");
    console.log(err);
})