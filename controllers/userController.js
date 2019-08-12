const db = require("../models");

module.exports = {
<<<<<<< HEAD
  //TODO Check if these are working
  findAll: function (req, res) {
    db.User
      .find(req.query).sort({ totalWins: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    db.User
      .findOne(req.params.email)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateOne: function (req, res) {
    console.log("wins", req.body.wins);
    console.log("looses", req.body.losses);
    console.log("id", req.body.id);
    db.User.findOneAndUpdate({ _id: req.body.id }, {
      totalWins: req.body.wins, totalLosses: req.body.losses
    }, { new: true }).then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  }
};
=======
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
      // updateUserScore: function(req,res) {
      //   db.User
      //     .findById(req.params.id, (data) => {
      //       if(!data) {return new Error('Could not find document')}
      //       else {
      //         console.log(data);
      //       }
      //     })
      //     .then(dbModel => res.json(dbModel))
      //     .catch(err => res.status(422).json(err));
      // }
};

// Place.findById(req.params.id, function(err, p) {
//   if (!p)
//     return next(new Error('Could not load Document'));
//   else {
//     // do your updates here
//     p.modified = new Date();

//     p.save(function(err) {
//       if (err)
//         console.log('error')
//       else
//         console.log('success')
//     });
//   }
// });
>>>>>>> master
