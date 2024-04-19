const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor");

const extractPublicId = require("../utils/extractPublicId");
const { deleteImage } = require("../middleware/uploadMiddleware");
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
        return EntityProfile[entityProfile];
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

      if (!publicId) {
        const error = new Error("Failed to extract public id");
        error.statusCode = 500;
        throw error;
      }

      const deleteResult = await deleteImage(publicId);

      if (deleteResult.result === "ok" || deleteResult.result === "not found") {
        let EntityProfile = await entityModel.findByIdAndUpdate(
          userEntity[entity]._id,
          {
            [entityProfile]: file.path,
          }
        );
        return EntityProfile[entityProfile];
      }

      if (!deleteResult) {
        const error = new Error("Failed to delete old image");
        error.statusCode = 500;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageService();
