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
  jobTitle: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  experience: {
    type: String,
    default: ""
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  socialLinks: {
    website: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    portfolio: { type: String, default: "" }
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

const User = mongoose.model("User", userSchema)

module.exports = User