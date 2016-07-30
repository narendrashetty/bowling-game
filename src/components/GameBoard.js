import React from 'react';
import Frames from './Frames';

export const GameBoard = React.createClass({

  rollBall() {
    this.props.actions.rollBall();
  },

  restart() {
    this.props.actions.reset();
  },

  renderController() {
    const currentPlayerIndex = this.props.Game.get('currentPlayerIndex')
    const currentPlayer = this.props.Game.getIn(['players', currentPlayerIndex]);
    return (
      <div className="controller">
        <h2>{currentPlayer} Turn</h2>
        <button className="btn" onClick={this.rollBall}>Roll the Ball</button>
      </div>
    );
  },

  renderWinner() {
    const totalScore = this.props.Game.get('totalScore');
    const winnerIndex = totalScore.indexOf(Math.max(...totalScore));
    const winner = this.props.Game.getIn(['players', winnerIndex]);
    return (
      <div className="controller winner">
        <h2>{winner} is the winner!!!</h2>
        <button className="btn" onClick={this.restart}>Restart</button>
      </div>
    );
  },

  render() {
    return (
      <div className="gameboard">
        <Frames
          frames={this.props.Game.get('frames')}
          players={this.props.Game.get('players')}
          score={this.props.Game.get('score')}
          totalScore={this.props.Game.get('totalScore')}
          actions={this.props.actions}
        />
        {(() => {
          if (this.props.Game.get('hasCompleted')) {
            return this.renderWinner();
          } else {
            return this.renderController();
          }
        })()}
      </div>
    );
  }
});

export default GameBoard;