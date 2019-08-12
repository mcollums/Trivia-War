const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll);

router.route("/score/:id")
  .put(userController.updateUserScore)
//Matches with "/api/user/:id"
router.route("/:id")
  .get(userController.findById)

// Matches with "/api/user/:email"
router.route("/:email")
  .get(userController.findOne)

//updates the single player wins and losses after the game
// matches with "/api/user/:user"
router.route("/")
  .post(userController.updateOne)
//Matched with api/user/update/:id


module.exports = router;