const router = require("express").Router();
const gameController = require("../../controllers/gameController");

//Session Notes
//When user clicks "new game button" 
//POST /game/session
    //If first person clicking...
        //generate a new session in db
        //push user id 
        //push the game id
        //redirect to next route
    //Else 

    //Sending back data
    //Once we get back the POST data, redirect to new URL (dynamic)
    //Will contain everything we just pushed
    // /session/:sessionId/title/:gameId
        // POST 
        // GET will retrieve all questions for the game

router.route("/:sessionId/title/:gameId")
    .get(gameController.findSessionAndGameById)
    

module.exports = router;