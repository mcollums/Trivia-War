import axios from "axios";

export default {
  // Gets all games
  getGames: function () {
    console.log("API Get Games");
    return axios.get("/api/game");
  },
  // Gets the game with the given id
  getOneGame: function (id) {
    return axios.get("/api/game/" + id);
  },
  logout: function () {
    return axios.get("/logout");
  },
  checkAuth: function () {
    return axios.get("/user/me");
  },
  getUsers: function () {
    return axios.get("/api/user")
  },
  getOneUser: function (id) {
    return axios.get("/api/user/" + id);
  },
  getOneUserEmail: function (email) {
    return axios.get("/api/user/" + email);
  },
  postGameDetails: function (user) {
    return axios.post("/api/user", {
      id: user.id,
      wins: user.wins,
      losses: user.losses
    });


  }
  // updateUserScore: function(id) {
  //   return axios.put("api/user/score/" + id);
  // }
};

