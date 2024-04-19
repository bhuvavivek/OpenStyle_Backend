const UserProfileService = require("../../user/services/userProfileService");

const VendorService = require("../../vendor/services/vendorservice");
const { uploadMiddleware } = require("../middleware/uploadcloudinary");
const ImageService = require("../services/imageService");

class ImageController {
  async uploadImageProfile(req, res, next) {
    let folderName;
    let user;
    if (req.type === "USER") {
      folderName = "UserProfile";
    }
    if (req.type === "VENDOR") {
      folderName = "VendorProfile";
    }
    try {
      if (req.type === "VENDOR") {
        user = await VendorService.getVendorById(req.user.id);
      }

      if (req.type === "USER") {
        user = await UserProfileService.getUserProfile(req.user.id);
      }

      uploadMiddleware(folderName).single("file")(
        req,
        res,
        async function (err) {
          if (err) {
            throw err;
          }
          const result = await ImageService.addProfileImage(
            req.type,
            req.file,
            user
          );

          return res.status(200).json({ status: true, message: result });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async uploadSlider(req, res, next) {
    // if (req.type === "USER" || req.type === "VENDOR") {
    //   return res
    //     .status(400)
    //     .json({ message: "you are  not authorized to upload  slider" });
    // }

    let FolderName;

    if (
      !req.query.type ||
      (req.query.type !== "VENDOR" && req.query.type !== "USER")
    ) {
      return res.status(400).json({ message: "Please Send Valid Type" });
    }

    if (req.query.type === "USER") {
      FolderName = "UserSlider";
    }
    if (req.query.type === "VENDOR") {
      FolderName = "VendorSlider";
    }

    try {
      uploadMiddleware(FolderName).single("file")(
        req,
        res,
        async function (err) {
          if (err) {
            throw err;
          }
          const result = req.file;
          return res.status(200).json({ status: true, message: result });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteSlider(req, res, next) {
    try {
      if (!req.query.publicId) {
        return res.status(400).json({ message: "Public Id is required" });
      }
      const result = await ImageService.deleteSliderImage(req.query.publicId);
      if (result) {
        return res
          .status(200)
          .json({ status: true, message: " Image Delete Successfully" });
      }

      return res
        .status(404)
        .json({ status: false, message: "Image Not Found" });
    } catch (error) {
      next(error);
    }
  }

  async uploadShopImages(req, res, next) {
    if (req.type !== "VENDOR") {
      return res
        .status(400)
        .json({ message: "You are not authorized to upload shop images" });
    }

    try {
      uploadMiddleware("ShopImages").single("file")(
        req,
        res,
        async function (err) {
          if (err) {
            throw err;
          }
          if (!req.file) {
            return res
              .status(400)
              .json({ status: false, message: "File NOT RECEIVED" });
          }
          const result = await ImageService.uploadSliderImage(
            req.file,
            req.user.id
          );

          return res.status(200).json({ status: true, message: result });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteShopImage(req, res, next) {
    try {
      if (req.type !== "VENDOR") {
        return res
          .status(400)
          .json({ message: "You are not authorized to delete shop images" });
      }
      if (!req.query.publicId) {
        return res.status(400).json({ message: "Public Id is required" });
      }

      let publicId = `ShopImages/${req.query.publicId}`;
      const result = await ImageService.deleteShopImage(publicId, req.user.id);
      if (result) {
        return res
          .status(200)
          .json({ status: true, message: " Image Delete Successfully" });
      }
      return res
        .status(400)
        .json({ status: false, message: "Image Not Found" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ImageController();
