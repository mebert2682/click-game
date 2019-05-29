import React from "react";
import cardInfo from "../cards.json";
import "../styles.css"

class Game extends React.Component {
  state = {
    cardInfo: [...cardInfo],
    userScore: 0,
    topScore: 0,
  };


  handleCardsClicked = cardId => {
    var isClicked = false;

    var cardInfo = [...this.state.cardInfo];

    cardInfo.forEach(card => {
      if (card.id === cardId) {
        if (!card.clicked) {
          isClicked = true;
          card.clicked = true;
        }
      }
    });

    isClicked ? this.handleNotClicked(cardInfo) : this.handleClicked(cardInfo);

  };

  handleNotClicked = cardInfo => {

    var shuffleCards = cardInfo.sort(() => 0.5 - Math.random());

    var userScore = this.state.userScore + 1;

    var topScore = this.state.topScore;

    if (userScore > topScore) {
      topScore = userScore
    }

    this.setState({
      cardInfo: shuffleCards,
      userScore: userScore,
      topScore: topScore
    });

  };

  handleClicked = cardInfo => {

    var shuffleCards = cardInfo.sort(() => 0.5 - Math.random());

    shuffleCards.forEach(card => (card.clicked = false))

    this.setState({
      cardInfo: shuffleCards,
      userScore: 0
    });

  };



  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-dark bg-dark d-flex justify-space-between">
          <span className="navbar-brand mb-0">The Rap Game</span>
          <span className="scoreInfo text-light">
            Current Score: {this.state.userScore} || Top Score: {this.state.topScore}
          </span>
        </nav>
        <div className="jumbotron jumbotron-fluid bg-warning text-dark text-center hero">

        </div>
        <div className="container-fluid">

          <h1>Welcome to the Rap Game!</h1>
          <p>Click on a rapper to get started. Don't click on the same rapper twice.</p>
          <div className="row align-items-center">

            {this.state.cardInfo.map(card => {
              return (
                //where does key come from?
                <div className="col-12 col-sm-6 col-md-3" key={card.id}>
                  <div className="hovereffect">
                    <div className="overlay">
                      <h2>{card.name}</h2>
                    </div>
                    <img
                      src={card.image}
                      alt={card.name}
                      className="img-fluid img-thumbnail rounded"
                      onClick={() => this.handleCardsClicked(card.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }
}


export default Game;