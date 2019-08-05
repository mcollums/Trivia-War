import React, { Component } from "react";
import API from "./utils/API";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import GameCard from "./GameCard";
import GameCol from "./GameCol";

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
        clicked: "",
        outcome: "",
        index: 0,
        timer: 10
    };

    componentDidMount() {
        this.getGame("5d47aeac6793d50a1005670f")
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
          this.setUserAnswer();
        }
      }

    //Click Handler
    handleClick = id => {
        console.log(id);
        this.setState({
            clicked: id
        });
    };

    //Timer goes here

    //When game starts
    gameStart = () => {



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
                            {/* {this.state.questions.map(question => (
                                <GameCard
                                    key={question.q_id}
                                    id={question.q_id}
                                    question={question.question}
                                    handleClick={this.handleClick}
                                />
                            ))} */}
                        </GameCol>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GameContainer