const db = require("../models");

module.exports = {
    //TODO Check if these are working
    findAll: function(req, res) {
        db.User
          .find(req.query).sort({totalWins: -1})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
        db.User
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findOne: function(req, res) {
        db.User
          .findOne(req.params.email)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      updateUserScore: function(req,res) {
        db.User
          .findById(req.params.id)
          .then((user) => {
            if(!user) {return new Error('Could not find document')}
            else {
              console.log(req.body);
              if(req.body.totalWins){
                user.totalWins = user.totalWins+1
              }else if(req.body.totalLosses){
                user.totalLosses = user.totalLosses+1
              }
              user.save().then(dbUser => {
                req.login(dbUser);
                res.json(dbUser);
              })
              
            }
          })
          .catch(err => res.status(422).json(err));
      }
};