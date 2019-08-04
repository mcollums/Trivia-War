const router = require("express").Router();
const gameController = require("../../controllers/gameController");

//EXAMPLE FROM IN CLASS ACTIVITY
// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

// router.route("/")
//     .get(gameController.findAllGames)

// router.route("/:id")
//     .get(gameController.findGameById)

module.exports = router;