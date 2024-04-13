const multer = require("multer");
const path = require("path");
const fs = require("fs");

// sotrage setup for multer
const shopImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/shopimages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname));
  },
});

// profile image url
const userProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileimages/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname));
  },
});

// profile image url
const vendorProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileimages/vendor");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.basename(file.originalname));
  },
});

// multer upload setup
const uploadShopImages = multer({ storage: shopImageStorage });
const uploadUserProfile = multer({ storage: userProfileStorage });
const uploadVendorProfile = multer({ storage: vendorProfileStorage });

module.exports = { uploadShopImages, uploadUserProfile, uploadVendorProfile };
