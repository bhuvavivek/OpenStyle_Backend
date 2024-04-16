const { Router } = require("express");
const authRouter = require("./authRoute");
const profileRouter = require("./profileRoute");

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
module.exports = router;
