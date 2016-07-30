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
            return <th>{++index}</th>;
          })}
        </tr>
      </thead>
    );
  },

  renderFrames(playerIndex) {
    return this.props.frames.map((frame, index) => {
      return (
        <td style={{'border': '1px solid'}}>
          {frame.getIn([playerIndex, 'frameStatus'])}
          {frame.getIn([playerIndex, 'rolls']).map((roll) => {
            return <div>{roll}</div>;
          })}

          {this.props.score.getIn([index, playerIndex])}
        </td>
      );
    });
  },

  renderScore(playerIndex) {
    let totalScore = 0;
    this.props.score.forEach((frame) => {
      if (frame.get(playerIndex)) {
        totalScore += frame.get(playerIndex);
      }
    });
    return (
      <td>
        {totalScore}
      </td>
    );
  },

  render() {
    return (
      <table width={800} style={{
      }}>
        {this.renderHeader()}
        <tbody>
          {this.props.players.map((player, index) => {
            return (
              <tr key={player}>
                <td>{player}</td>
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