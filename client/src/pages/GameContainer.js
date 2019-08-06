import React, { Component } from "react";
import API from "../utils/API";
import GameCard from "../components/GameCard";
import GameCol from "../components//GameCol";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

let quizQuestions = [];

class GameContainer extends Component {
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
        timer: 10
    };

    componentDidMount() {
        this.getGame("5d487a4906fcbe5b82066f9d")
    }

    //Getting the game information from the Database based on the game's ID
    //Then updating the state
    getGame(gameId) {
        API.getOneGame(gameId)
            .then(res => {
                //quiz Questions will be held outside the component so we can go through the questions/answers
                //with an index value
                quizQuestions = res.data;
                // console.log("QUIZ QUESTIONS: " + JSON.stringify(quizQuestions));
                this.setQuestionState(res.data)
                // console.log(this.state);
            });
    }

    // Setting the state of the game
    setQuestionState(data) {
        let index = this.state.index;
        this.setState({
            title: data.title,
            category: data.category,
            question: data.questions[index].question,
            answers: data.questions[index].answers,
            correctAnswer: data.questions[index].correctAnswer,
            questionCount: data.questions.length
        })
        console.log(this.state);
        this.timerID = setInterval(() => this.decrimentTime(), 1000);
    }

    decrimentTime() {
        if (this.state.timer !== 0) {
            this.setState({
                timer: this.state.timer - 1
            });
        } else {
            // this.setUserAnswer();
        }
    }

    //Click Handler
    handleSelection = id => {
        console.log(id);
        this.setState({
            clicked: id
        });
    };

    //First question and it's answers are populated to the page
    //Timer starts
    //User selects an answer that stays highlighted when clicked (give class of chosen)
    //If user clicks another section, the old selected isn't highlighted anymore
    //New selected is highlighted
    //At the end of the timer the answer is logged
    //If user selection == correct Index then add a point to correct
    //Else add a point to incorrect
    //When the last question is answered, push data to the database:
    //correct, incorrect => session model as user_score


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

export default GameContainer