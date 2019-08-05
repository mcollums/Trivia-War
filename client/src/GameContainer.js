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
        this.getGame("5d4766a48deabe07ba32892f")
    }

    //Getting the game information from the Database based on the game's ID
    //Then updating the state
    getGame(gameId) {
        API.getOneGame(gameId)
            .then(res => {
                quizQuestions = res.data;
                console.log("QUIZ QUESTIONS: " + quizQuestions);
                this.setGameState(res.data)
                console.log(this.state);
            });
    }

    //Setting the state of the game
    setGameState (data) {
        const 
    }

    setQuestionsState() {
        //Take all Answer Options
        const answerOptions = quizQuestions.map(question => {
          question.incorrect_answers.splice(
            Math.round(Math.random() * 3) + 1,
            0,
            question.correct_answer
          );
          return question.incorrect_answers;
        });
    
        // Set First Question and Answer Options
    
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: answerOptions[0],
          questionCount: quizQuestions.length
        });
        this.timerID = setInterval(() => this.decrimentTime(), 1000);
    
        this.setState({
          isFetching: false
        });
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
                            {this.state.questions.map(question => (
                                <GameCard
                                    key={question.q_id}
                                    id={question.q_id}
                                    question={question.question}
                                    handleClick={this.handleClick}
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