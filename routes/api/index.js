const router = require("express").Router();
const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
const sessionRoutes = require("./sessionRoutes");


// Game routes
router.use("/user", userRoutes);
router.use("/session", sessionRoutes);
router.use("/game", gameRoutes);


module.exports = router;