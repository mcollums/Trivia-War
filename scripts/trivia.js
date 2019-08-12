const axios = require('axios');
const mongoose = require("mongoose");
const db = require("../models");
const htmlToText = require("html-to-text");

// const text = htmlToText.fromString(originText);


mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/trivia_masters"
);

makeArr = (data, callback) => {
    let string = htmlToText.fromString(data);
    let answersObject = string.split(',');

    console.log("DATA FROM MAKEARR "+ answersObject);
    console.log("IS ARRAY? " + Array.isArray(answersObject));
    return {answersObject};
    // callback(newArr);
}

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
            // console.log(results[0].category);

            triviaSeed.push(
                {
                    category: results[0].category,
                    questions: [
                        {
                            "question": htmlToText.fromString(results[0].question),
                            // "answers": htmlToText.fromString(results[0].incorrect_answers),
                            "answers": makeArr(results[0].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[0].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[1].question),
                            "answers": makeArr(results[1].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[1].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[2].question),
                            "answers": makeArr(results[2].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[2].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[3].question),
                            "answers": makeArr(results[3].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[3].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[4].question),
                            "answers": makeArr(results[4].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[4].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[5].question),
                            "answers": makeArr(results[5].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[5].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[6].question),
                            "answers": makeArr(results[6].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[6].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[7].question),
                            "answers": makeArr(results[7].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[7].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[8].question),
                            "answers": makeArr(results[8].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[8].correct_answer)
                        },
                        {
                            "question": htmlToText.fromString(results[9].question),
                            "answers": makeArr(results[9].incorrect_answers),
                            "correctAnswer": htmlToText.fromString(results[9].correct_answer)
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