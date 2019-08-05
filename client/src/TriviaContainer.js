import React, { Component } from "react";
import API from "./utils/API";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import TriviaCard from "./TriviaCard";
import TriviaCol from "./TriviaCol";

class TriviaContainer extends Component {
    state = {
        title: "",
        category: "",
        questions: [],
        correct: 0,
        incorrect: 0,
        clicked: "",
        outcome: ""
    };

    componentDidMount() {
        //When the page loads I've hard coded the page to get the first DB Quiz
        API.getOneGame("5d4766a48deabe07ba32892f")
        .then(res => {
        console.log(res.data);
        this.setState(
            {questions: res.data.questions,
            title: res.data.title,
            category: res.data.category
            });
        console.log(this.state);
        });
      }

    handleClick = id => {
        console.log(id);
        this.setState({
            clicked: id
        });
    };

    //Timer goes here

    //When game starts
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
                        <TriviaCol size="10">
                            {this.state.questions.map(question => (
                                <TriviaCard
                                    key={question.q_id}
                                    id={question.q_id}
                                    question={question.question}
                                    handleClick={this.handleClick}
                                />
                            ))}
                        </TriviaCol>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default TriviaContainer