const express = require("express");
const { authenticate } = require("../../../shared/middleware/authenticate");
const {
  getvendor,
  updateVendor,
} = require("../../controllers/vendorController/vendorController");
const router = express.Router();

router.use(authenticate);
router.get("/", getvendor);
router.put("/", updateVendor);

module.exports = router;
