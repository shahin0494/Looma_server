const jobs = require("../models/jobModel")


// add job
exports.addJobController = async (req, res) => {
  try {
    const data = req.body;

    // ✅ Extract user email from token payload
    const userEmail = req.payload.email;

    // ✅ Attach email to the job
    data.email = userEmail;

    // Parse fields safely
    data.specializations = JSON.parse(data.specializations || "[]");
    data.experience = JSON.parse(data.experience || "[]");
    data.technicalSkills = JSON.parse(data.technicalSkills || "[]");

    // Handle file uploads
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

    // Save job
    const newJob = new jobs(data);
    await newJob.save();

    res.status(200).json({ message: "Job added successfully", job: newJob });
  } catch (err) {
    console.error("❌ Error adding job:", err);
    res.status(500).json({ error: err.message });
  }
};

// get all jobs
exports.getAllJobs = async (req, res) => {
  console.log("inside get all jobs controller");
  const searchKey = req.query.search
  const uEmail = req.payload.email
  const query = {
    jobTitle: { $regex: searchKey, $options: "i" },
    email: { $ne: uEmail }
  }
  try {
    const allJobs = await jobs.find(query)
    res.status(200).json(allJobs)
  } catch (error) {
    res.status(500).json(error)
  }
}

// view single job
exports.viewJobController = async (req, res) => {
  console.log("inside viewJobController");
  const { id } = req.params
  console.log(id);
  try {
    const viewJob = await jobs.findById({ _id: id })
    res.status(200).json(viewJob)
  } catch (error) {
    res.status(500).json(error)
  }

}

// get all user uploaded job
exports.getAllUserUploadJobsController = async (req, res) => {
  console.log("inside getAllUserUploadJobsController");
  const Uemail = req.payload.email
  try {
    const allUserJobs = await jobs.find({ email: Uemail })
    res.status(200).json(allUserJobs)
  } catch (error) {
    res.status(500).json(error)
  }
}

// removing user uploaded job
exports.deleteUserJobController = async (req, res) => {
  console.log("inside delete user job controller");
  // get book id
  const { id } = req.params
  console.log(id);
  try {
    await jobs.findByIdAndDelete({ _id: id })
    res.status(200).json("deletion successfull")
  } catch (err) {
    res.status(500).json(err)
  }
}

// get all user bought books
exports.getAllUserBoughtJobsController = async (req, res) => {
  console.log("inside getAllUserBoughtBooks controller");
  const email = req.payload.email
  try {
    const allUserBoughtJobs = await jobs.find({ bought: email })
    res.status(200).json(allUserBoughtJobs)
  } catch (error) {
    res.status(500).json(error)
  }
}

// admin all books
exports.getAllJobsAdminController = async (req, res) => {
  console.log("inside getAllJobsAdminController");
  try {
    const allAdminJobs = await jobs.find()
    res.status(200).json(allAdminJobs)
  } catch (error) {
    res.status(500).json(error)
  }
}

// admin update status
exports.updateJobStatusController = async (req, res) => {
  console.log("inside updateJobStatusController");
  const { _id, username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, email, phone, website, github, linkedin, twitter, portfolio, works,status, profilePhoto, backgroundPhoto, userMail, bought } = req.body
  try {
    const updateJob = await jobs.findByIdAndUpdate({ _id }, { username, jobTitle, specializations, fees, availability, location, summary, experience, technicalSkills, email, phone, website, github, linkedin, twitter, portfolio, works, status, profilePhoto, backgroundPhoto, userMail, jobStatus: "approved", bought }, { new: true })
    await updateJob.save()
    res.status(200).json(updateJob)
  } catch (error) {
    res.status(500).json(error)
  }
}

// exports.addJobController = async (req, res) => {
//   try {
//     // 🧩 Extract the body
//     const data = req.body;

//     // 🧠 Parse JSON strings safely
//     data.specializations = JSON.parse(data.specializations || "[]");
//     data.experience = JSON.parse(data.experience || "[]");
//    data.technicalSkills = JSON.parse(data.technicalSkills || "[]");
//     // 🖼 Handle file uploads (if you’re storing filenames)
//     const files = req.files;
//     if (files?.profilePhoto) {
//       data.profilePhoto = files.profilePhoto.map((file) => file.filename);
//     }
//     if (files?.backgroundPhoto) {
//       data.backgroundPhoto = files.backgroundPhoto.map((file) => file.filename);
//     }
//     if (files?.works) {
//       data.works = files.works.map((file) => file.filename);
//     }

//     // 💾 Create and save
//     const newJob = new jobs(data);
//     await newJob.save();

//     res.status(200).json({ message: "Job added successfully", job: newJob });
//   } catch (err) {
//     console.error("❌ Error adding job:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
