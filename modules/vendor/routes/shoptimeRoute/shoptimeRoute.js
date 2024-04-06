const { Router } = require("express");
const ShopTimeController = require("../../controllers/shopTimeController/shopTiming");

const router = Router();

router
  .route("/")
  .get(ShopTimeController.getShopTiming)
  .put(ShopTimeController.updateShopTiming);

module.exports = router;
