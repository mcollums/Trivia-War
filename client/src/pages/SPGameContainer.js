import React, { Component } from "react";
import API from "../utils/API";
import GameCard from "../components/GameCard";
import GameCol from "../components//GameCol";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

let quizQuestions = [];

class SinglePlayerGameContainer extends Component {
    state = {
        // userId: this.props.params.userId,
        // gameId: this.props.params.gameId,
        title: "",
        category: "",
        question: "",
        questionCount: 0,
        answers: [],
        correctAnswer: "",
        correct: 0,
        incorrect: 0,
        userSelect: "",
        outcome: "",
        index: 0,
        timer: 10,
        socketArr: ""
    };

    //TODO: Add route that will get the game based on the user's selection
    componentDidMount() {
        this.getGame("5d47aeac6793d50a1005670f");
        this.timerID = setInterval(() => this.decrimentTime(), 1000);
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

    // This function decreases the time limit of the game 
    decrimentTime() {
        if (this.state.timer !== 0) {
            this.setState({
                timer: this.state.timer - 1
            });
        } else {
            this.setUserAnswer();
        }
    }

    //This method updates the game state basked on what the user clicked.
    handleSelection = id => {
        console.log(id);
        this.setState({
            userSelect: id
        }, () => {
            //putting this in a callback so we're sure the state has been updated
            //before setUserAnswer is called
            this.setUserAnswer();
        });
    };

    //This method checks if the user answer is correct and checks if the
    // game continues or not based on if there are any questions left
    setUserAnswer = () => {
        //if the user didn't select an answer add to incorrect
        if (this.state.userSelect === "") {
            console.log("No answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({
                incorrect: newIncorrect
            });
            //if the user selected the correct answer, add to correct
        } else if (this.state.userSelect === this.state.correctAnswer) {
            console.log("Correct answer selected");
            let newCorrect = this.state.correct + 1;
            this.setState({
                correct: newCorrect
            });
            //if the user selected the incorrect answer, add to incorrect
        } else if (this.state.userSelect !== this.state.correctAnswer) {
            console.log("Incorrect Answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({
                incorrect: newIncorrect
            });
        }

        //This variable is checking to see what the next index value will be
        let nextIndex = (this.state.index + 1);

        //if the next index value is equal to the total amount of questions then stop the game
        //otherwise, keep going
        if (nextIndex === this.state.questionCount) {
            this.endGame();
        } else {
            this.setNextQuestion();
        }
    }

    setNextQuestion = () => {
        let newIndex = this.state.index + 1;
        this.setState({
            index: newIndex,
            timer: 10,
            question: quizQuestions.questions[newIndex].question,
            answers: quizQuestions.questions[newIndex].answers,
            correctAnswer: quizQuestions.questions[newIndex].correctAnswer,
            userSelect: ""
        }, function () {
            console.log(this.state);
        });
    }

    endGame = () => {
        console.log("GAME OVER");
        clearInterval(this.timerID);
    }


    //Query the db to compare user's scores and determine a winner
    //If this user is the winner, display "winner"
    //Else display "Try again next time"
    //PUT result in db
    //Set timer for 5 seconds and then...  
    //Send back to user's homepage

render() {
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

                            <h2>{this.state.question}</h2>
                            <h4>Tick Tock <strong>{this.state.timer}s</strong> left</h4>
                            {this.state.answers.map(answer => (
                                <GameCard
                                    id={answer}
                                    key={answer}
                                    answer={answer}
                                    handleSelection={this.handleSelection}
                                />
                            ))}
                        </Jumbotron>

                    </GameCol>

                </Row>
                <Row>
                    <Col size="6" id="player1">
                        <img style={{ marginTop:"50px",width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={"https://yokoent.com/images/iron-man-png-chibi-1.png"} />
                        <h5 style={{color:"white"}}>Score</h5>
                        {/* <img style={{color:"white"}} className="text-center"> Player 1 </img> */}
                    </Col>
                    <Col size="6" id="player2">
                    <img style={{ marginTop:"50px",width: "100px", height: "100px", backgroundColor: "white", borderRadius: "50%" }} alt={"player1"} src={"https://i.pinimg.com/originals/2c/16/8a/2c168a24a066e44e3b0903f453449fe5.jpg"} />
                    <h5 style={{color:"white"}}>Score</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
}

export default SinglePlayerGameContainer