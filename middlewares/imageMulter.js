// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `image-${Date.now()}-${file.originalname}`)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     // img with png,jpg,jpeg,webp
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
//         cb(null, true)
//     } else {
//         cb(null, false)
//         return cb(new Error("only accepts png,jpg,jpeg and webp 🥸"))
//     }
// }

// const multerConfig = multer({
//     storage,
//     fileFilter
// })

// module.exports = multerConfig

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }

  // ✅ Prevent crash if multer tries to access undefined file arrays
  if (!req.files) req.files = {};
  if (!req.files[file.fieldname]) req.files[file.fieldname] = [];

  cb(null, true);
};

const multerConfig = multer({ storage, fileFilter });

module.exports = multerConfig;