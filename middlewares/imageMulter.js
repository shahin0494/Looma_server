const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    // img with png,jpg,jpeg,webp
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only accepts png,jpg,jpeg and webp 🥸"))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig