import React, { Component } from 'react';
import Tile from '../Tile/Tile.js';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <div className="Board">
        <div className="Board__containerCards">
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
        </div>
      </div>
    );
  }
}

export default Board;
