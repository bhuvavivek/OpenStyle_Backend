const { Router } = require("express");
const salonInfoController = require("../controllers/salonInfoController");
const favouriteSalonController = require("../../shared/controllers/favouriteSalonController");
const { authenticate } = require("../../shared/middleware/authenticate");

const router = Router();

router.use(authenticate);

router.get("/info", salonInfoController.getSalonInfo);

router
  .route("/favourite")
  .post(favouriteSalonController.addFavouriteSalon)
  .delete(favouriteSalonController.removeFavouriteSalon)
  .get(favouriteSalonController.getFavouriteSalon);

module.exports = router;
