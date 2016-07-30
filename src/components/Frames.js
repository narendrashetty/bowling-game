import React from 'react';

export const Frames = React.createClass({
  renderHeader() {
    return (
      <thead>
        <tr>
          <th rowSpan="2">Player</th>
          <th colSpan="10">Frames</th>
          <th rowSpan="2">Score</th>
        </tr>
        <tr>
          {this.props.frames.map((frame, index) => {
            return <th key={index}>{++index}</th>;
          })}
        </tr>
      </thead>
    );
  },
  renderFrames(playerIndex) {
    return this.props.frames.map((frame, index) => {
      return (
        <td 
          key={`${playerIndex}-frame-${index}`}
          className="frame"
          data-status={frame.getIn([playerIndex, 'frameStatus'])}
        >
          <div className="frame__rolls">
            {frame.getIn([playerIndex, 'rolls']).map((roll, index) => {
              return <div className="roll" key={index}>{roll}</div>;
            })}
          </div>
          <div className="frame__score">
            {this.props.score.getIn([index, playerIndex])}
          </div>
        </td>
      );
    });
  },

  renderScore(playerIndex) {
    return (
      <td className="scoreboard__finalScore" key={`${playerIndex}-score`}>
        {this.props.totalScore.get(playerIndex)}
      </td>
    );
  },

  render() {
    return (
      <table className="scoreboard">
        {this.renderHeader()}
        <tbody>
          {this.props.players.map((player, index) => {
            return (
              <tr key={index}>
                <td className="scoreboard__player" key={`${index}-player`}>{player}</td>
                {this.renderFrames(index)}
                {this.renderScore(index)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
});

export default Frames;