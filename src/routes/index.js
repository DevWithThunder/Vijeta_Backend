const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const adminRouter = require("./adminRoutes");

// router.use('/user', userRouter);
router.use("/auth", authRouter);
router.use("/user", adminRouter);

module.exports = router;
