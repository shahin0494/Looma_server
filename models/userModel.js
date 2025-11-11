const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ["client", "freelancer", "admin"],
    default: "client"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const users = mongoose.model("users", userSchema)

module.exports = users