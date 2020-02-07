const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const db = require("../models")
const passport = require("../config/passport");

// API Routes
router.use("/api", apiRoutes);

//Login / Register Routes
router.post("/register",(req,res)=>{
  db.User.create({username:req.body.username, picLink:req.body.picLink, email:req.body.email,password:req.body.password})
  .then((newUser)=>{
    res.redirect(307, "/login")
  })
  .catch((err)=>{
    if (err.code === 11000) {
      console.log("duplicate email")
      res.status(401).json({ error: "That email already exists." })
    }
    else {
      res.json(err);
    }
  })
});

router.post('/login', passport.authenticate("local"),  (req, res) => {
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  console.log("logged out user")
  req.logout();
  res.sendStatus(200);
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
