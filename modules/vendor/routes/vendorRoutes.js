const { Router } = require("express");
const authRoute = require("./authRoute/authRoute");
const categoryRoute = require("./categoryRoute/categoryRoute");
const subCategoryRoute = require("./subCategoryRoute/subCategoryRoute");
const serviceRoute = require("./serviceRoute/serviceRoute");
const shopTimingRoute = require("./shoptimeRoute/shoptimeRoute");
const vendorProfile = require("./profileRoute/profileRoute");

const router = Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/subcategory", subCategoryRoute);
router.use("/service", serviceRoute);
router.use("/shoptime", shopTimingRoute);
router.use("/profile", vendorProfile);
module.exports = router;
