import axios from "axios";

export default {
  // Gets all books
  getGames: function() {
    console.log("API Get Games");
    return axios.get("/api/game");
  },
  // Gets the book with the given id
  getOneGame: function(id) {
    return axios.get("/api/game/" + id);
  },
  getUsers: function() {
    return axios.get("/api/user")
  },
  getOneUser: function(id) {
    return axios.get("/api/user/" + id);
  }
  // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};
