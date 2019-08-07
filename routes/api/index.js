const router = require("express").Router();
const gameRoutes = require("./gameRoutes");
const userRoutes = require("./userRoutes");
const sessionRoutes = require("./sessionRoutes");

// Game routes
router.use("/game", gameRoutes);
router.use("/user", userRoutes);
router.use("/session", sessionRoutes);


module.exports = router;
