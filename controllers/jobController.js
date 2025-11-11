const jobs = require("../models/jobModel")




// add job
exports.addJobController = async (req, res) => {
  try {
    // 🧩 Extract the body
    const data = req.body;

    // 🧠 Parse JSON strings safely
    data.specializations = JSON.parse(data.specializations || "[]");
    data.experience = JSON.parse(data.experience || "[]");
   data.technicalSkills = JSON.parse(data.technicalSkills || "[]");
    // 🖼 Handle file uploads (if you’re storing filenames)
    const files = req.files;
    if (files?.profilePhoto) {
      data.profilePhoto = files.profilePhoto.map((file) => file.filename);
    }
    if (files?.backgroundPhoto) {
      data.backgroundPhoto = files.backgroundPhoto.map((file) => file.filename);
    }
    if (files?.works) {
      data.works = files.works.map((file) => file.filename);
    }

    // 💾 Create and save
    const newJob = new jobs(data);
    await newJob.save();

    res.status(200).json({ message: "Job added successfully", job: newJob });
  } catch (err) {
    console.error("❌ Error adding job:", err);
    res.status(500).json({ error: err.message });
  }
};


// get all jobs
exports.getAllJobs= async (req,res)=>{
    console.log("inside get all jobs controller");
    const searchKey = req.query.search
    const uEmail = req.payload.email
    const query = {
        jobTitle: { $regex: searchKey,$options:"i"},
        email:{ $ne:uEmail}
    }
    try {
        const allJobs = await jobs.find(query)
        res.status(200).json(allJobs)
    } catch (error) {
        res.status(500).json(error)
    }
}

// view single job
exports.viewJobController = async (req,res)=>{
    console.log("inside viewJobController");
    const {id} = req.params
    console.log(id);
    try {
        const viewJob = await jobs.findById({_id : id})
        res.status(200).json(viewJob)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

