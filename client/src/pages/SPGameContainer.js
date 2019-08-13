import React, { Component } from "react";
import API from "../utils/API";
import GameCard from "../components/GameCard";
import thumpsup from "../images/thumpsup.jpg";
import thumpsdown from "../images/thumpsdown.png"
import GameCol from "../components/GameCol";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import update from 'immutability-helper';
import { Redirect } from "react-router-dom";
const timer = require('react-native-timer');

let quizQuestions = [];
let nextIndex = 0;
let newIndex = 0;

class SinglePlayerGameContainer extends Component {

   state = {
      title: "",
      category: "",
      question: "",
      questionCount: 0,
      answers: [],
      correctAnswer: "",
      correct: 0,
      incorrect: 0,
      userSelect: "",
      outcome: false,
      index: 0,
      timer: 10,
      socketArr: "",
      userInfo: {},
      redirectTo: null,
      click: false,
      counter: false
   };

   //TODO: Add route that will get the game based on the user's selection
   componentDidMount() {
      setTimeout(() => {
         this.setState({ showLoading: false });
     }, 2000);
      this.getGame(this.props.id);
      this.timerID = setInterval(() => this.decrimentTime(), 1000);
      this.getUserPic();
      console.log(this.state.userInfo);
   }

   getUserPic = () => {
      API.checkAuth()
         .then(response => {
            // this runs if the user is logged in
            console.log("response: ", response.data)
            this.setState({ userInfo: response.data }, this.loadUsers);
         })
         .catch(err => {
            // this runs if the user is NOT logged in
            this.setState({ redirectTo: "/" })
         })
   }

   stopTimer = () => {
      clearInterval(this.timerID);

   }
   //Getting the game information from the Database based on the game's ID
   //Then updating the state
   getGame(gameId) {
      API.getOneGame(gameId)
         .then(res => {
            //quiz Questions will be held outside the component 
            //so we can go through the questions/answers with an index value
            quizQuestions = res.data;
            this.setQuestionState(res.data);
         });
   }

   // Setting the state of the game
   setQuestionState(data) {
      let index = this.state.index;
      this.setState({
         title: data.title,
         category: data.category,
         question: data.questions[index].question,
         answers: data.questions[index].answers.answersObject,
         correctAnswer: data.questions[index].correctAnswer,
         questionCount: data.questions.length
      }, () => { });
   }

   // This function decreases the time limit of the game 
   decrimentTime() {
      if (this.state.timer !== 0) {
         this.setState({
            timer: this.state.timer - 1
         });
      } else {
         this.setState({
            timer: 10
         }, this.setUserAnswer()
         )

      }
   }

   //This method updates the game state basked on what the user clicked.
   handleSelection = id => {
      this.stopTimer();
      console.log(id);
      this.setState({
         userSelect: id,
         click: true

      }, () => {
         //putting this in a callback so we're sure the state has been updated
         //before setUserAnswer is called
         this.setUserAnswer();
      });
   };

   //This method checks if the user answer is correct and checks if the
   //game continues or not based on if there are any questions left
   setUserAnswer = () => {
      //if the user didn't select an answer add to incorrect
      console.log(this.state.index);
      console.log(this.state.questionCount);
      if (this.state.userSelect === "") {
         console.log("No answer selected");
         // stop the timer,
         let newIncorrect = this.state.incorrect + 1;
         this.stopTimer();
         console.log("New incorrect", newIncorrect);
         console.log("state incorrect", this.state.incorrect);
         this.setState({
            incorrect: newIncorrect,
            counter: false,
            click: true,
         }, () => {
            this.setState({
               userInfo: update(this.state.userInfo, {
                  losses: { $set: newIncorrect }
               }, () => { console.log("Updating the state", this.state.userInfo) })
            })
         }, () => this.handleSelection(this.state.userInfo._id))
      }

      //if the user selected the correct answer, add to correct
      else if (this.state.userSelect === this.state.correctAnswer) {
         console.log("Correct answer selected");
         this.stopTimer(this.timerID);
         let newCorrect = this.state.correct + 1;
         this.setState({
            correct: newCorrect,
            counter: true,
         },
            this.setState({
               userInfo: update(this.state.userInfo, {
                  wins: { $set: newCorrect }
               }, () => { console.log("Updating the state", this.state.userInfo) })
            })
         )
      }
      //if the user selected the incorrect answer, add to incorrect
      else if (this.state.userSelect !== this.state.correctAnswer) {
         console.log("Incorrect Answer selected");
         let newIncorrect = this.state.incorrect + 1;
         this.stopTimer(this.timerID);
         this.setState({
            incorrect: newIncorrect,
            counter: false,
         }, () => {
            this.setState({
               userInfo: update(this.state.userInfo, {
                  losses: { $set: newIncorrect }
               }, () => { console.log("Updating the state", this.state.userInfo) })
            })
         }, () => { console.log("Updating the state", this.state.userInfo) })

      }
   }

   nextQuestion = () => {


      //This variable is checking to see what the next index value will be
      this.stopTimer();
      nextIndex = (this.state.index + 1);

      //if the next index value is equal to the total amount of questions then stop the game
      //otherwise, keep going
      if (nextIndex === this.state.questionCount) {
         console.log("Question state", this.state.questionCount);
         console.log("state ", this.state);
         this.stopTimer();
         this.endGame();
      } else {
         this.setNextQuestion();
      }
   }

   // button for Play again, updates the users scores and returns to the home page.
   handlePlayAgainBtn = (user) => {
      console.log("user details after click play again", user);
      this.stopTimer();
      API.postGameDetails(user).then(res => {
         console.log(res);
         this.setState({ redirectTo: "/home" })
      })

   }
   checkforNextQuestion = () => {
      this.timerID = setInterval(() => this.decrimentTime(), 1000);
      newIndex = this.state.index + 1;
      console.log("New index", newIndex, "questionCount", this.state.questionCount);
      console.log();
      if (newIndex !== this.state.questionCount) {
         this.setNextQuestion(newIndex);

      }
      else {
         this.setState({
            outcome: true
         })
      }
   }

   setNextQuestion = (newIndex) => {

      this.setState({
         index: newIndex,
         timer: 10,
         question: quizQuestions.questions[newIndex].question,
         answers: quizQuestions.questions[newIndex].answers.answersObject,
         correctAnswer: quizQuestions.questions[newIndex].correctAnswer,
         userSelect: "",
         click: false

      }, function () {
         console.log(this.state);
      });


   }

   endGame = () => {
      console.log("GAME OVER");
      console.log(this.state);
      this.stopTimer();

   }


   //Query the db to compare user's scores and determine a winner
   //If this user is the winner, display "winner"
   //Else display "Try again next time"
   //PUT result in db
   //Set timer for 5 seconds and then...  
   //Send back to user's homepage

   render() {
      if(this.state.showLoading) {
         return (
             <div className="circlecontainer">
             <div class="lds-circle"><div></div></div>
             </div>
         );
     }

      if (this.state.redirectTo) {
         clearInterval(this.state.timer);
         return <Redirect to={this.state.redirectTo} />
      }

      return (
         <div>
            <Container fluid="-fluid">
               <Row>
                  <Col size="12" id="titleCol">
                     <h5 style={{ color: "white", marginTop: "100px", fontSize: "30px" }} className="text-center"> {this.state.title} </h5>
                  </Col>
               </Row>
               <Row>
                  <GameCol size="12">
                     <Jumbotron jumboWidth="800px" addClass="userData" jumboHeight="80%">

                        {
                           this.state.click && !this.state.outcome
                              ?
                              (
                                 this.state.counter
                                    ?
                                    <div>
                                       <h4>Your are Correct..!!! </h4>
                                       <button className="btn btn-primary btn-dark" onClick={this.checkforNextQuestion}>Next Question</button>
                                    </div>
                                    :

                                    <div>
                                       <h4> Correct Answer {this.state.correctAnswer}</h4>
                                       <button className="btn btn-primary btn-dark" onClick={this.checkforNextQuestion}>Next Question </button>
                                    </div>
                              )
                              :
                              (
                                 !this.state.outcome
                                    ? (
                                       <div>
                                          <h2>{this.state.question}</h2>
                                          <h4>Tick Tock <strong>{this.state.timer}s</strong> left</h4>


                                          {this.state.answers.map(answer => (
                                             <GameCard
                                                id={answer}
                                                key={answer}
                                                answer={answer}
                                                correctAnswer={this.state.correctAnswer}
                                                handleSelection={this.handleSelection}

                                             />
                                          ))}
                                       </div>
                                    ) : (
                                       <div>
                                          <h5><strong>{"Game Over"}</strong></h5>
                                          <button className="btn btn-primary btn-dark" onClick={() => this.handlePlayAgainBtn(this.state.userInfo)}>Play Again</button>
                                       </div>
                                    )
                              )
                        }
                     </Jumbotron>
                  </GameCol>
               </Row>

               <Row>

                  <Col size="6" id="player1">
                     <img style={{ marginTop: "50px", width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={thumpsup} />
                     <h5 style={{ color: "white" }}>Correct  {this.state.correct}</h5>
                  </Col>
                  <Col size="6" id="player2">
                     <img style={{ marginTop: "50px", width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={thumpsdown} />
                     <h5 style={{ color: "white" }}>InCorrect {this.state.incorrect}</h5>
                  </Col>
                  <Col size="3"></Col>
               </Row>
            </Container>
         </div>
      )
   }

}

export default SinglePlayerGameContainer