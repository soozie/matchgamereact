import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import './Tile.scss';

class Tile extends Component {
  static propTypes = {
    tile: PropTypes.shape({
      value: PropTypes.number.isRequired,
      isFlipped: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
    moveCount: PropTypes.func.isRequired,
    handleTileFlip: PropTypes.func.isRequired,
  };

  handleClick = (e) => {
    e.preventDefault();
    const { tile, handleTileFlip, moveCount } = this.props;
    if (!tile.isFlipped) {
      handleTileFlip(tile);
      moveCount();
    }
  }

  render() {
    
    const { tile } = this.props;

    return (
      <div className="Tile">
        <ReactCardFlip isFlipped={tile.isFlipped}>
          <div
            className="card"
            key="front"
            onClick={this.handleClick}
          />
          <div
            className="card"
            key="back"
            onClick={this.handleClick}
            style={{ backgroundColor: tile.color }}
          >
            {tile.value}
          </div>
        </ReactCardFlip>
      </div>
    );
  }
}

export default Tile;
