const jobs = require("../models/jobModel")

exports.addJobController = async (req, res) => {
    console.log("inside add job controller ");
    const { username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, email,phone,website,github,linkedin,twitter,portfolio, works, status, profilePhoto, backgroundPhoto } = req.body
    console.log(username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills,email,phone,website,github,linkedin,twitter,portfolio, works, status, profilePhoto, backgroundPhoto);
    try {
        const jobDetails = await jobs.findOne({ username, jobTitle })
        if (jobDetails) {
            res.status(409).json("job already exists please add another")
        } else {
            const newJob = new jobs({
                username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, email,phone,website,github,linkedin,twitter,portfolio, works, status, profilePhoto, backgroundPhoto
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// const jobs = require("../models/jobModel")

// exports.addJobController = async (req, res) => {
//     console.log("inside add job controller ");

//     // 1. Get text data from req.body
//     const { username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status } = req.body

//     // 2. Get file data from req.files (populated by multer)
//     // 'req.files' will contain objects for 'profilePhoto' and 'backgroundPhoto'
//     // We just need to save the file paths
    
//     // Check if files exist and get their paths
//     const profilePhotoPath = req.files.profilePhoto ? req.files.profilePhoto[0].path : ""
//     const backgroundPhotoPath = req.files.backgroundPhoto ? req.files.backgroundPhoto[0].path : ""
    
//     // Log the text data (files will be logged by multer if setup)
//     console.log(username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status);

//     try {
//         const jobDetails = await jobs.findOne({ username, jobTitle })
//         if (jobDetails) {
//             res.status(409).json("job already exists please add another")
//         } else {
//             const newJob = new jobs({
//                 username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, contact, socialLinks, works, status,
//                 // 3. Save the file paths to the database
//                 profilePhoto: [profilePhotoPath], // Save path in an array, as per your schema
//                 backgroundPhoto: [backgroundPhotoPath] // Save path in an array, as per your schema
//             })
//             await newJob.save()
//             res.status(200).json(newJob)
//         }
//     } catch (err) {
//         console.error(err); // Always good to log the error
//         res.status(500).json(err)
//     }
// }