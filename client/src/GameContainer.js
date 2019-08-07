import React, { Component } from "react";
import API from "./utils/API";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import GameCard from "./GameCard";
import GameCol from "./GameCol";
// added by jyoti for scoket.io
import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");

let quizQuestions = [];
let socketid;

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
        timer: 10,
        clicked: ""


    };

    componentDidMount() {
        this.setSocketId();
        this.getGame("5d4879f49b36da1948280722");

    }
    // added by jyoti for getting the socket id after a user connected.

    setSocketId() {
        socket.on('userConnected', socketData => {
            socketid = socketData.socketId;
            console.log(" this is the socket id " + socketid);
            socket.on('newclientconnect', data => {
                console.log(data.description);
            });
        });
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
                this.setQuestionState(res.data);
                // console.log(this.state);
            });
    }

    // Setting the state of the game
    setQuestionState(data) {
        console.log(data);
        let index = this.state.index;
        this.setState({
            title: data.title,
            category: data.category,
            question: data.questions[index].question,
            answers: data.questions[index].answers,
            correctAnswer: data.questions[index].correctAnswer,
            questionCount: data.questions.length
        }, () => console.log(this.state));

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
    handleSelection(id, socketid) {
        console.log(id);
        console.log("Socket id", socketid);
        if (id) {
            this.setState({
                clicked: id
            });
        }
        socket.emit('clicked',
            {
                socketid: socketid
                // will add user name here later on

            });
        socket.on('clicked', function (data) {
            console.log("This Socket id" + data.data + " user clicked first");
        });



    };



    setUserAnswer = () => {
        if (this.state.userSelect === "") {
            console.log("No answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({
                incorrect: newIncorrect
            })
        } else if (this.state.userSelect === this.state.correctAnswer) {
            console.log("Correct answer selected");
            let newCorrect = this.state.correct + 1;
            this.setState({
                correct: newCorrect
            })
        } else if (this.state.userSelect !== this.state.correctAnswer) {
            console.log("Incorrect Answer selected");
            let newIncorrect = this.state.incorrect + 1;
            this.setState({


            });
        }
    }

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
                        <Col size="10" id="titleCol">
                            <h5 className="text-center"> {this.state.title} </h5>
                        </Col>
                    </Row>
                    <Row>
                        <GameCol size="10">
                            <h2>{this.state.question}</h2>
                            <h2>{this.state.timer}</h2>
                            {this.state.answers.map(answer => (
                                <GameCard
                                    id={answer}
                                    key={answer}
                                    answer={answer}
                                    socketid={socketid}
                                    handleSelection={this.handleSelection.bind(this)}

                                />
                            ))}
                        </GameCol>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GameContainer