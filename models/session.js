const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    //User 1 id
    //User 2 id
    //Quiz id
    //User 1 score
    //User 2 score
    // is Waiting? true/false
    //End result
  });

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session; 