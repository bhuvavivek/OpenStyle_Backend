const { Router } = require("express");
const authRouter = require("./authRoute");

const router = Router();

router.use("/auth", authRouter);

module.exports = router;
