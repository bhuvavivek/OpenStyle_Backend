const { Router } = require("express");

const { authenticate } = require("../middleware/authenticate");
const { uploadImageProfile } = require("../controllers/imageControllers");

const router = Router();
router.use(authenticate);

router.put("/profile", uploadImageProfile);

module.exports = router;
