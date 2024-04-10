const { Router } = require("express");
const AboutController = require("../controllers/aboutcontroller");
const { authenticate } = require("../../shared/middleware/authenticate");

const router = Router();

router.use(authenticate);

router.patch("/", AboutController.UpdateAbout);

router.get("/:id", AboutController.getAbout);
module.exports = router;
