import React, { Component } from "react";
import API from "./utils/API";

import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import GameCard from "./GameCard";
import GameCol from "./GameCol";

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
        // this.loadGame();
        // API.getGames()
        // .then( function (res) {
        //   console.log("Response from LoadGame: " + JSON.stringify(res.data));
        //   this.setState({ quesions: res.data })
        // })
        // .catch(err => console.log(err));

        API.getOneGame("5d4725637bad28162c028a5b")
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
    
    //   loadGame = () => {
    //     API.getGames()
    //       .then( function (res) {
    //         console.log("Response from LoadGame: " + res);
    //         // this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    //       })
    //       .catch(err => console.log(err));
    //   };

    // handleClick = id => {
    //     console.log(id);
    //     if (this.state.clicked.indexOf(id) === -1) {
    //         this.setState({ clicked: this.state.clicked.concat(id) }, function () {
    //             console.log("Added to array " + this.state.clicked);
    //             this.handleIncrement();
    //         });
    //     } else {
    //         console.log("Already in the array " + this.state.clicked);
    //         let currentLosses = this.state.losses;
    //         this.setState({ losses: currentLosses + 1 })
    //         console.log("Score: " + this.state.losses);
    //         this.handleReset();
    //     }
    // };

    render() {
        return (
            <div>
                <Container fluid="-fluid">
                    <Row>
                        <Col size="10" id="titleCol">
                            <h5 className="text-center">Don't click the same card twice and you win!</h5>
                            {/* <h5 className="text-center"> {this.state.message} </h5> */}
                        </Col>
                    </Row>
                    <Row>
                        <GameCol size="10">
                            {/* {this.state.questions.map(pokemon => ( */}
                                <GameCard
                                    // key={pokemon.id}
                                    // id={pokemon.id}
                                    // name={pokemon.name}
                                    // image={pokemon.image}
                                    // handleClick={this.handleClick}
                                />
                            {/* ))} */}
                        </GameCol>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default TriviaContainer