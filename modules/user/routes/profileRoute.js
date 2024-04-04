const express = require("express");
const { authenticate } = require("../../shared/middleware/authenticate");
const {
  getUserProfile,
  editUserProfile,
} = require("../controllers/profileController");
const router = express.Router();

router.use(authenticate);
router.get("/", getUserProfile);
router.put("/", editUserProfile);

module.exports = router;
