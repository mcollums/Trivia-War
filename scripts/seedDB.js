const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/trivia_masters"
);

const gameSeed = [
  {
    title: "Animal Trivia",
    category: "animals",
    questions: [
      {
        "q_id" : 0,
        "question1": "What color is a lion?",
        "answers" : [
          "red",
          "black",
          "green",
          "yellow"
        ],
        "correctIndex" : 3
      },
      {
        "q_id" : 1,
        "question1": "What color is a tiger?",
        "answers" : [
          "orange",
          "black",
          "green",
          "blue"
        ],
        "correctIndex" : 0
      },
      {
        "q_id" : 2,
        "question1": "What color is an elephant?",
        "answers" : [
          "orange",
          "grey",
          "green",
          "blue"
        ],
        "correctIndex" : 1
      }
    ]
  },
  {
    title: "Disney Trivia",
    category: "pop-culture",
    questions: [
      {
        "q_id" : 0,
        "question1": "What is Sleeping Beauty's name?",
        "answers" : [
          "Johanna",
          "Aurora",
          "Elizabeth",
          "Anna"
        ],
        "correctIndex" : 1
      },
      {
        "q_id" : 1,
        "question1": "What country is the movie Frozen modeled after?",
        "answers" : [
          "Germany",
          "Switzerland",
          "Norway",
          "Iceland"
        ],
        "correctIndex" : 2
      },
      {
        "q_id" : 2,
        "question1": "How many mice friends does Cinderella have?",
        "answers" : [
          "2",
          "3",
          "4",
          "5"
        ],
        "correctIndex" : 0
      }
    ]
  }
];

db.Game
  .remove({})
  .then(() => db.Game.collection.insertMany(gameSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
