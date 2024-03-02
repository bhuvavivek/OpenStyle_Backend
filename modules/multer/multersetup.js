const multer = require("multer");
const path = require("path");
const fs = require("fs");

// sotrage setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/shopimages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname));
  },
});

// multer upload setup
const upload = multer({ storage: storage });

module.exports = upload;
