const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor");

const extractPublicId = require("../utils/extractPublicId");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
};

// Cloudinary Configuration
cloudinary.config(cloudinaryConfig);
// imageService.js
class ImageService {
  async addProfileImage(type, file, userEntity) {
    // add profile image
    let entityModel;
    let entityProfile;
    let entity;

    try {
      if (!file) {
        const error = new Error("No file uploaded");
        error.statusCode = 400;
        throw error;
      }

      if (type === "VENOR") {
        entityModel = Vendor;
        entityProfile = "vendorProfile";
        entity = "vendor";
      }

      if (type === "USER") {
        entityModel = User;
        entityProfile = "userProfile";
        entity = "user";
      }

      if (!userEntity[entity][entityProfile]) {
        let EntityProfile = await entityModel.findByIdAndUpdate(
          userEntity[entity]._id,
          {
            [entityProfile]: file.path,
          }
        );
        return EntityProfile;
      }

      // delete old image
      let folderName;

      if (type === "USER") {
        folderName = "UserProfile";
      }

      if (type === "VENDOR") {
        folderName = "VendorProfile";
      }

      const publicId = extractPublicId(
        folderName,
        userEntity[entity][entityProfile]
      );

      console.log(publicId);

      const deleteProfileImage = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
        resource_type: "image",
      });

      // console.log(deleteProfileImage);

      return file;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageService();
