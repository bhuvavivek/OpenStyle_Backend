const { Router } = require("express");

const { authenticate } = require("../middleware/authenticate");
const {
  uploadImageProfile,
  deleteSlider,
  uploadSlider,
  uploadShopImages,
  deleteShopImage,
} = require("../controllers/imageControllers");

const router = Router();
router.use(authenticate);

router.put("/profile", uploadImageProfile);

router.route("/slider").delete(deleteSlider).post(uploadSlider);

router.route("/shopImage").post(uploadShopImages).delete(deleteShopImage);
module.exports = router;
