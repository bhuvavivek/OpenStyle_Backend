const UserProfileService = require("../../user/services/userProfileService");

const VendorService = require("../../vendor/services/vendorservice");
const { uploadMiddleware } = require("../middleware/uploadcloudinary");
const ImageService = require("../services/imageService");

class ImageController {
  async uploadImageProfile(req, res, next) {
    let user;
    try {
      if (req.type === "VENDOR") {
        user = await VendorService.getVendorById(req.user.id);
      }

      if (req.type === "USER") {
        user = await UserProfileService.getUserProfile(req.user.id);
      }

      uploadMiddleware(req.type).single("file")(req, res, async function (err) {
        if (err) {
          throw err;
        }
        const result = await ImageService.addProfileImage(
          req.type,
          req.file,
          user
        );

        return res.status(200).json({ status: true, message: result });
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ImageController();
