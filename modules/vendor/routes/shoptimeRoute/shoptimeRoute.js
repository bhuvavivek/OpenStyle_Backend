const { Router } = require("express");
const ShopTimeController = require("../../controllers/shopTimeController/shopTiming");
const { authenticate } = require("../../../shared/middleware/authenticate");

const router = Router();

router.use(authenticate);

router
  .route("/")
  .get(ShopTimeController.getShopTiming)
  .put(ShopTimeController.updateShopTiming);

module.exports = router;
