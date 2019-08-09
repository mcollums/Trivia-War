const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('./config/passport.js')
const { google } = require("googleapis")
const session = require('express-session')
const path = require("path");
const chalk = require('chalk');

app.use(session({ secret: process.env.SESSION_SECRET || "the cat ate my keyboard", resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

const db = require("./models")

// Added by jyoti for scoket connection 
var server = require('http').Server(app);
var io = require('socket.io')(server);
//Added by jyoti

//OAuth
//============================================================================
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URI
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email'
]

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}
function getConnectionUrl() {
  return createConnection().generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  })
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trivia_masters");

//SOCKET AND GAME STATES START HERE
// ===========================================================================================
//Player Data on Server
const playerArr = [];

const makePlayer = (socket) => {
  console.log(chalk.blue("Making new player for: ", socket.id));
  return {
    id: socket.id,
    email: "",
    authorized: false,
    socket: socket,
    status: "Idle"
  }
}

const getPlayerById = (id) => {
  return playerArr.find(p => p.id === id)
}

//Session Data on Server
let sessionId = 1;

const sessions = [];

const makeSession = (id, creator, category) => {
  return {
    id,
    category: null,
    playerOne: creator,
    playerTwo: null
  }
}

const searchSessions = (socket, category) => {

}

//ERIC
// const makePlayer = (socket) => {
//   console.log("Making new player");
//   return {
//     id: socket.id,
//     email: "",
//     authorized: false,
//     socket: socket
//   }
// }

// const getPlayerById = (id) => {
//   return playerArr.find(p => p.id === id)
// }

//ERIC
// const sessions = [];

// const makeSession = (id, creator) => {
//   return {
//     id,
//     playerOne: creator,
//     playerTwo: null
//   }
// }





io.on('connection', function (player) {
  //On connection, create a new player that's now authorized.
  const newPlayer = makePlayer(player)
  playerArr.push(newPlayer)

  //Tell all the other sockets that there's a new player
  playerArr.filter(p => p.id !== newPlayer.id).forEach(p => {
    p.socket.emit("message", "somebody else connected")
  });

  // Auto put people in games
  // if(sessions.length === 0){
  //   sessions.push(makeSession(sessionId++, newPlayer))
  // } else {
  //   // Let's look for an open game
  //   const s = sessions.find(s => s.playerTwo === null);
  //   if(s){
  //     console.log("new game joined")
  //     s.playerTwo = newPlayer;
  //     s.playerOne.socket.emit("joinedGame", newPlayer.id);
  //     s.playerTwo.socket.emit("joinedGame", s.playerOne.id)
  //   } else {
  //     sessions.push(makeSession(sessionId++, newPlayer))
  //   }
  // }

  // console.log("This is the socket ID", player.id);
  //Let server-side know someone's connected
  // console.log('==================================================================');
  // console.log('A user connected!', player.id);
  // console.log("ALL SOCKET USERS INFO :", playerArr);
  // console.log("CLIENTS # = " + playerArr.length);

  player.on('disconnect', () => {
    console.log("Player " + player.id + "is disconnecting");
    const index = playerArr.findIndex(p => p.id === player.id);
    playerArr.splice(index, 1);
    // Look for any games they are a part of and kill them
  })


  player.on("setuser", (data) => {
    console.log('==================================================================');
    console.log(chalk.green("Data from Server's SetUser ", JSON.stringify(data)));

    const index = playerArr.find(p => p.id === player.id);
    if (index) {
      console.log("User found in playersArr");
      index.email = data;
      index.socket.emit("addedEmail", "We added your email to your user ID");
      index.socket.emit('authorized', true);
    } else {
      console.log(chalk.red("User not found"));
    }

    // console.log('==================================================================');
    // console.log(chalk.blue("NEW USER: ", JSON.stringify(newUser)));
    // console.log(chalk.blue("Player Array in SetUser", JSON.stringify(playerArr)));
    // console.log(chalk.blue("CLIENTS # = " + playerArr.length));


    // player.emit("authorized", true)
  });


  player.on("seekGame", () => {
    // Try and find them a game, if we can, great!
    // Otherwise just make a new one and put them in it
    player.emit("joinedGame", { coolInfo: "Goes Here" })
  })

  player.on('player-matchmaking', gameData => {
    io.emit('player-matchmaking', gameData)
  });

  player.on('player-select', gameData => {
    io.emit('player-select', gameData)
  });

  player.on('player-ready', gameData => {
    io.emit('player-ready', gameData)
  });

  player.on('player-endGame', gameData => {
    io.emit('player-endGame', gameData)
  });
});

function buildGame(socket) {
  var gameObject = {};
  //generate random Object ID for reference later
  gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
  // gameObject.playerOne = socket.name;
  // gameObject.playerTwo = null;
  gameCollection.totalGameCount++;
  gameCollection.gameList.push({ gameObject });

  console.log("Game Created by " + socket.name + " w/ " + gameObject.id);
  io.emit('gameCreated', {
    name: socket.name,
    gameId: gameObject.id
  });
}
io.on('connection', function (socket) {
  console.log('A user connected!', socket.id);
  socket.broadcast.emit('user connected');
});






// ROUTES FOR GOOGLE AUTHENTICATION
//=======================================================================
app.get('/api/google/url', (req, res) => {
  res.json({ url: getConnectionUrl() })
})

function getGoogleAccountFromCode(code) {
  console.log("CODE");
  console.log(code);
  return createConnection().getToken(code).then(data => {
    console.log("DATA");
    console.log(data.tokens)
    return Promise.resolve(data.tokens)
  })
}

app.post('/api/google/code', (req, res) => {
  const { code } = req.body;
  getGoogleAccountFromCode(code).then(tokens => {
    console.log(tokens)
    const userConnection = createConnection()
    userConnection.setCredentials(tokens)
    userConnection.getTokenInfo(tokens.access_token).then(data => {
      console.log("TOKEN INFO");
      console.log(data);
      const { email, sub } = data;

      db.User.findOne({ email }).then(dbUser => {
        if (!dbUser) {
          // create a new user!
          db.User.create({
            email,
            authType: "google",
            googleId: sub
          }).then(finalDbUser => {
            req.login(finalDbUser, () => {
              res.json(true)
            })
          }).catch(err => {
            console.log(err)
            res.sendStatus(500)
          })

        } else {
          // Check the type and googleId
          // if it matches, great! Login the user!
          // if not, something odd is up, reject it
          console.log(dbUser);
          if (dbUser.authType === "google" && dbUser.googleId === sub + "") {
            req.login(dbUser, () => {
              res.json(true)
            });

          } else {
            res.sendStatus(500)
          }
        }
      })

    }).catch(() => {
      res.sendStatus(500)
    })
  })
})

app.get('/api/google/callback', function (req, res) {
  const code = req.query.code
  getGoogleAccountFromCode(code).then(tokens => {
    const userConnection = createConnection()
    userConnection.setCredentials(tokens)
    userConnection.getTokenInfo(tokens.access_token).then(data => {
      const { email, sub } = data;
      db.User.findOne({ email }).then(dbUser => {
        console.log(dbUser);
        if (!dbUser) {
          console.log("NEW USER");
          // create a new user!
          db.User.create({
            email,
            authType: "google",
            googleId: sub
          }).then(finalDbUser => {
            req.login(finalDbUser, () => {
              res.redirect(process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/");
            })
          }).catch(err => {
            console.log(err)
            res.sendStatus(500)
          })

        } else {
          if (dbUser.authType === "google" && dbUser.googleId === sub + "") {
            req.login(dbUser, () => {
              res.redirect(process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/");
            })
          } else {
            res.sendStatus(500)
          }
        }
      }).catch(err => console.log(err))

    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })
})

// Start the API server
server.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  // <<<<<<< HEAD
});

//Make sure Mongoose connection is disconnected
process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    console.log("Mongoose disconnected");
    process.exit(0);
  })
})


