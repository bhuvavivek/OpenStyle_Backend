const multer = require("multer");
const path = require("path");

const { cloudinary } = require("../config/cloudinary-cofig");
function uploadMiddleware(userType) {
  let folderName;
  if (userType === "USER") {
    folderName = "UserProfile";
  }
  if (userType === "VENDOR") {
    folderName = "VendorProfile";
  }

  const allowedFormats = ["jpg", "jpeg", "png", "gif"]; // Allowed image formats

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}`;
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      // Check if the file format is allowed
      if (!allowedFormats.includes(fileExtension)) {
        throw new Error(
          "Invalid file format. Only JPG, JPEG, PNG, and GIF are allowed."
        );
      }

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
}

module.exports = uploadMiddleware;
