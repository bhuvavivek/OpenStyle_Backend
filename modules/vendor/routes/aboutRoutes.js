const { Router } = require("express");
const AboutController = require("../controllers/aboutcontroller");
const { authenticate } = require("../../shared/middleware/authenticate");

const router = Router();

router.use(authenticate);

router
  .route("/")
  .get(AboutController.getAbout)
  .patch(AboutController.UpdateAbout);

module.exports = router;
