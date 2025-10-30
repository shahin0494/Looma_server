const jobs = require("../models/jobModel")

exports.addJobController = async (req, res) => {
    console.log("inside add job controller ");
    const { username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status, profilePhoto, backgroundPhoto } = req.body
    console.log(username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status, profilePhoto, backgroundPhoto);
    try {
        const jobDetails = await jobs.findOne({ username, jobTitle })
        if (jobDetails) {
            res.status(409).json("job already exists please add another")
        } else {
            const newJob = new jobs({
                username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status, profilePhoto, backgroundPhoto
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}