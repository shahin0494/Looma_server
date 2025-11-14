const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    specializations: {
        type: [String],
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    experience: {
        type: [String],
        required: true
    },
    technicalSkills: [
        {
            category: { type: String, default: "" },
            skills: { type: [String], default: [] }
        }
    ],
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    twitter: {
        type: String,
        default: ""
    },
    portfolio: {
        type: String,
        default: ""
    },
    works: {
        type: Array,
        default: ""
    },
    status: {
        type: String,
        default: "Not Available"
    },
    profilePhoto: {
        type: Array,
        default: ""
    },
    backgroundPhoto: {
        type: Array,
        default: ""
    },
    userMail: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        default: "pending"
    },
    bought: {
        type: String,
        default: ""
    },

})

const jobs = mongoose.model("jobs", jobSchema)
module.exports = jobs