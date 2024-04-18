const { Router } = require("express");
const { uploadMiddleware } = require("../middleware/uploadmiddleware");
const { authenticate } = require("../middleware/authenticate");
const { uploadImageProfile } = require("../controllers/imageControllers");

const router = Router();
router.use(authenticate);

router.post("/", uploadImageProfile);

module.exports = router;
