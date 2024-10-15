const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");

// router.use('/user', userRouter);
router.use("/auth", authRouter);

module.exports = router;
