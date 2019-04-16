import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Board from '../Board/Board.js';
import './Game.scss';

//  Returns a random integer between min (inclusive) and max (inclusive)
//  Using Math.round() will give you a non-uniform distribution!
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cardColors = {
  1: 'hsl(25, 85%, 65%)',
  2: 'hsl(55, 85%, 65%)',
  3: 'hsl(90, 85%, 65%)',
  4: 'hsl(160, 85%, 65%)',
  5: 'hsl(220, 85%, 65%)',
  6: 'hsl(265, 85%, 65%)',
  7: 'hsl(310, 85%, 65%)',
  8: 'hsl(360, 85%, 65%)'
};

const styles = theme => ({
  paper: {
    padding: '4em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    zIndex: 1,
    width: '150px',
    padding: '1em',
    fontWeight: 400,
  },
});

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fullMoves: 0,
      randomlyOrderedTiles: [],
    };
  }

  fullMoveUpdate = (moves) => {
    const { fullMoves } = this.state;
    this.setState({
      fullMoves: moves % 2 === 0 ? moves / 2 : fullMoves,
    });
  }

  shuffleTiles = () => {
    const unplacedInOrderCardValues = [];
    const randomlyOrderedTileValues = [];
  
    for (let i = 1; i <= 8; i++) {
      unplacedInOrderCardValues.push(i, i);
    }

    let tileId = 1;
    while (unplacedInOrderCardValues.length > 0) {
      const randomIndex = getRandomInt(0, unplacedInOrderCardValues.length - 1);
      randomlyOrderedTileValues.push({
        value: unplacedInOrderCardValues[randomIndex],
        isFlipped: false,
        color: cardColors[unplacedInOrderCardValues[randomIndex]],
        id: tileId++,
      });
      unplacedInOrderCardValues.splice(randomIndex, 1);
    }
  
    this.setState({
      randomlyOrderedTiles: randomlyOrderedTileValues,
      fullMoves: 0,
    });
  }

  updateTiles = (randomlyOrderedTiles) => {
    this.setState({
      randomlyOrderedTiles,
    });
  }

  render() {
    const { fullMoves, randomlyOrderedTiles } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <div className="GameIntro">
            <h2>Match Game</h2>
            <h6>Rules</h6>
            <p>Click on a card to reveal the number on the other side. Click on a
              second card to try and find a match to the first. If you succeed, the
              pair will be removed from play. If not, try again!</p>
            <h6>How To Win</h6>
            <p>You win when all pairs have been found.</p>
            <div className="GameIntro__moves">{`Moves: ${fullMoves}`}</div>
            <Fab
              variant="extended"
              aria-label="Shuffle"
              color="secondary"
              onClick={this.shuffleTiles}
              className={classes.fabButton}
            >
              SHUFFLE
            </Fab>
          </div>
          <Board 
            fullMoveUpdate={this.fullMoveUpdate}
            randomlyOrderedTiles={randomlyOrderedTiles}
            updateTiles={this.updateTiles}
          />
        </Paper>
      </Fragment>
    );
  }
}


export default withStyles(styles)(Game);