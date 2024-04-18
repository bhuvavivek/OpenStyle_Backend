const { uploadMiddleware } = require("../middleware/uploadmiddleware");
const PasswordService = require("../services/password");

class ImageController {
  async uploadImageProfile(req, res, next) {
    uploadMiddleware(req.type).single("file")(req, res, function (err) {
      if (err) {
        return next(err);
      }
      console.log(req.file);
      return res.status(200).json({ status: true, message: req.file });
    });
  }
}
module.exports = new ImageController();
