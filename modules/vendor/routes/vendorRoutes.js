const { Router } = require("express");
const authRoute = require("./authRoute/authRoute");
const categoryRoute = require("./categoryRoute/categoryRoute");
const subCategoryRoute = require("./subCategoryRoute/subCategoryRoute");
const serviceRoute = require("./serviceRoute/serviceRoute");

const router = Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/subcategory", subCategoryRoute);
router.use("/service", serviceRoute);

module.exports = router;
