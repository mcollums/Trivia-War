const router = require("express").Router();
const gameRoutes = require("./gameRoutes");

// Game routes
router.use("/game", gameRoutes);

module.exports = router;
