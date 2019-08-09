const axios = require('axios');
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/trivia_masters"
);

categoriesArray = [9, 12, 18, 21, 26, 27, 11, 14, 22, 19];
triviaSeed = [];
runSeeds = (i) => {
    console.log("we running stuff");

    // We then run the request with axios module on a URL with a JSON
    axios.get("https://opentdb.com/api.php?amount=10&category=" + categoriesArray[i] + "&type=multiple").then(
        function (response) {
            // Then we print out the trivia api data
            console.log("we got stuff")
            // console.log("Response from Trivia API: " + JSON.stringify(response.data.results));
            let results = response.data.results;
            console.log(results[0].category);

            triviaSeed.push(
                {
                    category: results[0].category,
                    questions: [
                        {
                            "question": results[0].question,
                            "answers": results[0].incorrect_answers,
                            "correctAnswer": results[0].correct_answer
                        },
                        {
                            "question": results[1].question,
                            "answers": results[1].incorrect_answers,
                            "correctAnswer": results[1].correct_answer
                        },
                        {
                            "question": results[2].question,
                            "answers": results[2].incorrect_answers,
                            "correctAnswer": results[2].correct_answer
                        },
                        {
                            "question": results[3].question,
                            "answers": results[3].incorrect_answers,
                            "correctAnswer": results[3].correct_answer
                        },
                        {
                            "question": results[4].question,
                            "answers": results[4].incorrect_answers,
                            "correctAnswer": results[4].correct_answer
                        },
                        {
                            "question": results[5].question,
                            "answers": results[5].incorrect_answers,
                            "correctAnswer": results[5].correct_answer
                        },
                        {
                            "question": results[6].question,
                            "answers": results[6].incorrect_answers,
                            "correctAnswer": results[6].correct_answer
                        },
                        {
                            "question": results[7].question,
                            "answers": results[7].incorrect_answers,
                            "correctAnswer": results[7].correct_answer
                        },
                        {
                            "question": results[8].question,
                            "answers": results[8].incorrect_answers,
                            "correctAnswer": results[8].correct_answer
                        },
                        {
                            "question": results[9].question,
                            "answers": results[9].incorrect_answers,
                            "correctAnswer": results[9].correct_answer
                        }
                    ]
                }
            );

            i++;
            if (i === categoriesArray.length) {
                console.log("we're done")
                db.Game
                    .collection.insertMany(triviaSeed)
                    .then(data => {
                        console.log(data.result.n + " records inserted!");
                        process.exit(0);
                    })
                    .catch(err => {
                        console.error(err);
                        process.exit(1);
                    });
            }
            else {
                console.log("running this again")
                runSeeds(i);
            }
        }
    );
}

runSeeds(0);