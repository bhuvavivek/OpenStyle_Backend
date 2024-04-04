const { Router } = require("express");
const {
  setSummery,
  getSummery,
  destroySummery,
  getShopSlotTime,
  blockShopSlot,
  getblockShopSlpt,
} = require("../controllers/appointControllers/appointmentController");
const { authenticate } = require("../middleware/authenticate");
const router = Router();

router.use(authenticate);

router.post("/setSummery", setSummery);
router.get("/getSummery", getSummery);
router.delete("/deleteSummery", destroySummery);
router.get("/getShopSlotTime/:id", getShopSlotTime);
router.post("/blockSlot", blockShopSlot);
router.get("/getShopSlotTime", getblockShopSlpt);
module.exports = router;
