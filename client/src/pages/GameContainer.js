import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import MPGameCard from "../components/MPGameCard";
import GameCol from "../components//GameCol";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import socketAPI from "../utils/socketAPI";

let quizQuestions = [];

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            quizId: this.props.selected,
            userInfo: "",
            title: "",
            category: "",
            question: "",
            questionCount: 0,
            answers: [],
            correctAnswer: "",
            correct: 0,
            incorrect: 0,
            userSelect: "",
            message: "",
            index: 0,
            timer: 10,
            gameOver: false,

            // showLoading: true,
            redirectTo: null,
        };

        this.publishPlayerSelect = this.publishPlayerSelect.bind(this)
    }

    //TODO: Add route that will get the game based on the user's selection
    componentDidMount() {
        API.checkAuth()
            .then(response => {
                // this runs if the user is logged in
                this.setState({ userInfo: response.data },
                    () => console.log(JSON.stringify(this.state.userInfo)));
                //Grab the session info from the server
                socketAPI.publishGCMount();
                //Then set the state with the session info
                socketAPI.subscribeSessionInfo((info) => {
                    console.log("Subcribe Session Info" + JSON.stringify(info));
                    let userPosition = "";

                    if (this.state.userInfo.email === info.playerOne) {
                        userPosition = "p1"
                    } else if (this.state.userInfo.email === info.playerTwo) {
                        userPosition = "p2"
                    }

                    this.setState({
                        category: info.categoryId,
                        position: userPosition
                    }, () => {
                        console.log("User position in state " + this.state.position);
                        this.getGame(this.state.category);

                        //Start Timer
                        // this.timerID = setInterval(() => this.decrimentTime(), 1000);
                    })
                });
            }).catch(err => {
                // this runs if the uer is NOT logged in
                this.setState({ redirectTo: "/" })
            });

        socketAPI.subscribeTimerDec((timer) => {
            // console.log("Timer" + timer);
            this.setState({
                timer: timer
            })
        });

        socketAPI.subscribeEndTimer((message) => {
            console.log("Time's Up!");
            this.setUserAnswer((result) => {
                socketAPI.publishPlayerSelect(result);
            });
        });
        //Setting up Socket Listeners for Game:
        //Message comes back after either user selects an answer
        socketAPI.subscribeScoreUpdate((message) => {
            console.log(message);
            this.setState({
                message: message
            }, () => { console.log("State Message " + this.state.message) })
        });

        //Score comes back when both players have selected an ansnwer
        //Also updates to the next question
        socketAPI.subscribeNextQuestion((score) => {
            console.log("New Score = " + JSON.stringify(score));
            //This variable is checking to see what the next index value will be
            let nextIndex = (this.state.index + 1);

            // if the next index value is equal to the total amount of questions 
            // then stop the game otherwise, keep going
            if (nextIndex === this.state.questionCount) {
                this.endGame();
            } else {
                this.setNextQuestion();
            }
        });

        socketAPI.subscribeFinalScore((score) => {
            console.log("Final Score from Server " + JSON.stringify(score));
            console.log("User ID in state: " + this.state.userInfo.email);
            let userResult = "";
            if (score.winner === "tie") {
                userResult = "totalWins"
            } else if (score.winner === this.state.userInfo.email) {
                userResult = "totalWins";
            } else if (score.winner !== this.state.userInfo.email) {
                userResult = "totalLosses";
            }
            console.log("User result " + userResult);
            let obj = {}
            obj[userResult] = true;

            API.updateUserScore(this.state.userInfo.id, obj)
                .then(res => {
                    console.log(res);
                })
            this.setState({ redirectTo: "/home" });
        })
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
        // console.log(data);
        let index = this.state.index;
        this.setState({
            title: data.title,
            category: data.category,
            question: data.questions[index].question,
            answers: data.questions[index].answers,
            correctAnswer: data.questions[index].correctAnswer,
            questionCount: data.questions.length
        }, () => {
            // console.log("STATE" + JSON.stringify(this.state));
            // console.log("QUIZ QUESTIONS " + JSON.stringify(quizQuestions));
        });
    }

    //Click Handler
    publishPlayerSelect(selection) {
        console.log("User Selected: " + selection);
        this.setState({
            userSelect: selection
        }, () => {
            //putting this in a callback so we're sure the state has been updated
            //before setUserAnswer is called
            this.setUserAnswer((result) => {
                console.log("User is " + result);
                socketAPI.publishPlayerSelect(result);
            });
        })
    };


    //This method checks if the user answer is correct and checks if the
    // game continues or not based on if there are any questions left
    setUserAnswer = (callback) => {
        let userAnswerResult = "";

        //if the user didn't select an answer add to incorrect
        if (this.state.userSelect === "") {
            // console.log("No answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({
                incorrect: newIncorrect
            });
            userAnswerResult = "incorrect";

            //if the user selected the correct answer, add to correct
        } else if (this.state.userSelect === this.state.correctAnswer) {
            // console.log("Correct answer selected");
            let newCorrect = this.state.correct + 1;
            this.setState({
                correct: newCorrect
            });
            userAnswerResult = "correct"

            //if the user selected the incorrect answer, add to incorrect
        } else if (this.state.userSelect !== this.state.correctAnswer) {
            // console.log("Incorrect Answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({
                incorrect: newIncorrect
            });
            userAnswerResult = "incorrect";
        }

        console.log("User answer result = " + userAnswerResult);
        callback(userAnswerResult);
        this.setState({
            userSelect: ""
        })
        userAnswerResult = "";
    }

    setNextQuestion = () => {
        let newIndex = this.state.index + 1;
        this.setState({
            index: newIndex,
            timer: 10,
            question: quizQuestions.questions[newIndex].question,
            answers: quizQuestions.questions[newIndex].answers,
            correctAnswer: quizQuestions.questions[newIndex].correctAnswer,
            userSelect: "",
            message: ""
        }, function () {
            // console.log(this.state);
        });
    }

    endGame = () => {
        console.log("GAME OVER");
        this.setState({
            gameOver: true,
        }, () => {
            if (this.state.position === "p1") {
                console.log("Player One sending Game Data to server");
                socketAPI.publishEndGame();
            } else {
                console.log("Player 2 waiting on score");
            }
        })
      
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <div>
                <Container fluid="-fluid">
                    <Row>
                        <Col size="12" id="titleCol">
                            <h5 style={{ color: "white", marginTop: "100px", fontSize: "30px" }}
                                className="text-center"> {this.state.title} </h5>
                        </Col>
                    </Row>
                    <Row>
                        <GameCol size="12">
                            <Jumbotron jumboWidth="800px" addClass="userData" jumboHeight="80%">

                                <h2>{this.state.question}</h2>
                                <h4>Tick Tock <strong>{this.state.timer}s</strong> left</h4>
                                {this.state.answers.map(answer => (
                                    <MPGameCard
                                        id={answer}
                                        key={answer}
                                        publishPlayerSelect={this.publishPlayerSelect}
                                    />
                                ))}
                            </Jumbotron>

                        </GameCol>

                    </Row>
                    <Row>
                        <Col size="4" id="player1">
                            <img style={{ marginTop: "50px", width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={"https://yokoent.com/images/iron-man-png-chibi-1.png"} />
                            <h5 style={{ color: "white" }}>Score</h5>
                        </Col>
                        <Col size="4" id="message">
                            <h4 style={{ color: "white" }}>{this.state.message}</h4>
                        </Col>
                        <Col size="4" id="player2">
                            <img style={{ marginTop: "50px", width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={"https://i.pinimg.com/originals/2c/16/8a/2c168a24a066e44e3b0903f453449fe5.jpg"} />
                            <h5 style={{ color: "white" }}>Score</h5>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GameContainer