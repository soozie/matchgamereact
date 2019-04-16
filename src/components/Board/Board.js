import React, { Component } from 'react';
import PropTypes from "prop-types";
import Tile from '../Tile/Tile.js';
import './Board.scss';

class Board extends Component {
  static propTypes = {
    fullMoveUpdate: PropTypes.func.isRequired,
    updateTiles: PropTypes.func.isRequired,
    randomlyOrderedTiles: PropTypes.array.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      clickedTiles: 0,
      firstTile: false,
      moves: 0,
      fullMoves: 0,
    };

    this.handleTileFlip = this.handleTileFlip.bind(this);
  }
  
  handleTileFlip(tile) {
    const { clickedTiles, firstTile } = this.state;
    const { randomlyOrderedTiles, updateTiles } = this.props;
    const newArray = [...randomlyOrderedTiles];
    const indexSelectTile = newArray.findIndex(t => t.id === tile.id);
    const stateUpdate = {};
    let updateValue = clickedTiles + 1;
    newArray[indexSelectTile] = {
      ...newArray[indexSelectTile],
      isFlipped: true,
    }

    if (updateValue === 1) {
      stateUpdate.firstTile = tile;
    } else if (updateValue === 2) {
      if (newArray[indexSelectTile].value === firstTile.value) {
        updateValue = 0;
      } else {
        this.flipTiles(newArray[indexSelectTile], firstTile);
      }
    } else if (updateValue > 2) {
      return;
    }

    updateTiles(newArray);
    
    this.setState({
      clickedTiles: updateValue,
      ...stateUpdate,
    });
  }

  flipTiles = (tile1, tile2) => {
    setTimeout(() => {
      const newArray = [...this.props.randomlyOrderedTiles];
      const indexSelectTile1 = newArray.findIndex(t => t.id === tile1.id);
      const indexSelectTile2 = newArray.findIndex(t => t.id === tile2.id);
      newArray[indexSelectTile1] = {
        ...newArray[indexSelectTile1],
        isFlipped: false,
      }
      newArray[indexSelectTile2] = {
        ...newArray[indexSelectTile2],
        isFlipped: false,
      }

      this.props.updateTiles(newArray);

      this.setState({
        clickedTiles: 0,
      });
    }, 1000);
  }

  moveCount = () => {
    const { moves: prevMoves } = this.state;
    const { fullMoveUpdate } = this.props;
    const moves = prevMoves + 1;
    fullMoveUpdate(moves);

    this.setState({
      moves,
    });
  }

  render() {
    const { randomlyOrderedTiles } = this.props;

    console.log(randomlyOrderedTiles);

    return (
      <div className="Board">
        <div className="Board__containerCards">
          {randomlyOrderedTiles.map((tile, i) => (
            <Tile
              key={i}
              tile={tile}
              handleTileFlip={this.handleTileFlip}
              moveCount={this.moveCount}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
