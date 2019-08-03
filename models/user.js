const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    picLink: { type: String },
    //PicBinary is here for later if we want to store a user's image in Mongo... 
    //ask Michelle for article link when ready.
    picBinary: {data: Buffer, type: String},
    totalWins: { type: Number, default: 0 },
    totalLosses: {type: Number, default: 0},
    //totalPoints is here for later if we have time to implement
    //a points system based on difficulty instead of total wins.
    totalPoints: {type: Number, default: 0},
  });

const User = mongoose.model("User", userSchema);

module.exports = User;