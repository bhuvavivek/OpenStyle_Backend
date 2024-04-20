const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor");

const extractPublicId = require("../utils/extractPublicId");
const { deleteImage, getAllSlider } = require("../middleware/uploadcloudinary");
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

  async getSliderImages(folderName) {
    try {
      const sliderImages = await getAllSlider(folderName);
      if (sliderImages.length === 0 || !sliderImages) {
        return [];
      }

      const slideImagePaths = sliderImages.map((image) => {
        return image.secure_url;
      });

      return slideImagePaths;
    } catch (error) {
      throw error;
    }
  }

  async deleteSliderImage(publicId) {
    try {
      const deleteResult = await deleteImage(publicId);
      if (deleteResult.result === "ok") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async uploadSliderImage(file, vendorId) {
    try {
      const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
        {
          $push: {
            images: file.path,
          },
        },
        {
          new: true,
        }
      );

      return vendor.images;
    } catch (error) {
      throw error;
    }
  }

  async deleteShopImage(publicId, vendorId) {
    try {
      const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
        {
          $pull: {
            images: { $regex: publicId },
          },
        },
        {
          new: true,
        }
      );
      const deleteResult = await deleteImage(publicId);
      if (deleteResult.result === "ok") {
        return vendor.images;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ImageService();
