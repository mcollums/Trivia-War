const router = require("express").Router();
const gameController = require("../../controllers/gameController");

//EXAMPLE FROM IN CLASS ACTIVITY
// // Matches with "/api/game"
router.route("/")
    .get(gameController.findAllGames);

// // Matches with "/api/game/:id"
router.route("/:id")
  .get(gameController.findGameById)

module.exports = router;
