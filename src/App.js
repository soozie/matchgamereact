import React, { Component } from 'react';
import Board from './components/Board/Board.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gameInstructions">
          <h2>Match Game</h2>
          <h6>Rules</h6>
          <p>Click on a card to reveal the number on the other side. Click on a
            second card to try and find a match to the first. If you succeed, the
            pair will be removed from play. If not, try again!</p>
          <h6>How To Win</h6>
          <p>You win when all pairs have been found.</p>
        </div>
        <Board />
      </div>
    );
  }
}

export default App;
